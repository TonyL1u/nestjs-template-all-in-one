import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { omit } from 'lodash';
import { map } from 'rxjs/operators';

/** 剔除返回对象中的某些值 */
@Injectable()
export class OmitInterceptor<T extends object> implements NestInterceptor<T, Omit<T, keyof T>> {
  private keys: (keyof T)[] = [];

  constructor(...keys: (keyof T)[]) {
    this.keys = keys;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((result: T) => omit(result, this.keys) as Omit<T, keyof T>));
  }
}
