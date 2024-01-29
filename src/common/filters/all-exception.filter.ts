import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

interface CommonCatchInfo {
  path: string;
  timestamp: string;
}

interface ExceptionInfo {
  statusCode: number;
  message: string;
  error?: string;
}

type ExceptionResponseBody = ExceptionInfo & CommonCatchInfo;

const FALLBACK: ExceptionInfo = {
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  message: 'Internal error',
  error: 'Internal error'
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const commonInfo: CommonCatchInfo = {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString()
    };
    let exceptionInfo: ExceptionInfo = {
      ...FALLBACK,
      message: exception.message
    };
    if (exception instanceof HttpException) {
      exceptionInfo = resolveHttpException(exception);
    } else if (exception instanceof QueryFailedError) {
      exceptionInfo = resolveQueryFailedException(exception);
    }
    const responseBody: ExceptionResponseBody = {
      ...commonInfo,
      ...exceptionInfo
    };
    const { statusCode } = responseBody;

    httpAdapter.reply(ctx.getResponse(), responseBody, exception.getStatus?.() || statusCode);
  }
}

function resolveHttpException(exception: HttpException) {
  const statusCode = exception.getStatus();
  const response = exception.getResponse() as ExceptionInfo;
  response.statusCode ||= statusCode;

  if (typeof response === 'string') {
    return { statusCode, message: response };
  }

  return response;
}

function resolveQueryFailedException(exception: QueryFailedError): ExceptionInfo {
  const { message, driverError } = exception;

  return {
    message,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    error: String(driverError)
  };
}
