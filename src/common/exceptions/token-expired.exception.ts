import { ExceptionCode } from '@/common/constants';

import { CustomException } from './custom.exception';

export class TokenExpiredException extends CustomException {
  constructor(message: string) {
    super(message, ExceptionCode.TOKEN_EXPIRED);
  }
}
