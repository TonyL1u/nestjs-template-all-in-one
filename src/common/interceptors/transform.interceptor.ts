import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  code: number;
  success: boolean;
  result: T;
}

/** 成功接口返回值统一化 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(result => ({
        code: 0,
        success: true,
        result: result === void 0 ? null : result
      }))
    );
  }
}
