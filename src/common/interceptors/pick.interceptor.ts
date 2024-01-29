import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { pick } from 'lodash';
import { map } from 'rxjs/operators';

/** 选择返回对象中的某些值 */
@Injectable()
export class PickInterceptor<T extends object> implements NestInterceptor<T, Pick<T, keyof T>> {
  private keys: (keyof T)[] = [];

  constructor(...keys: (keyof T)[]) {
    this.keys = keys;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((result: T) => pick(result, this.keys) as Pick<T, keyof T>));
  }
}
