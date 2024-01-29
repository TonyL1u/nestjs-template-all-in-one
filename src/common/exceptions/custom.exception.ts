import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionCode } from '../constants';

export class CustomException extends HttpException {
  constructor(message: string, statusCode: ExceptionCode) {
    super({ message, statusCode }, HttpStatus.BAD_REQUEST);
  }
}
