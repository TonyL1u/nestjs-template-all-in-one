import { ExceptionCode } from '@/common/constants';

import { CustomException } from './custom.exception';

export class EmailRegisteredException extends CustomException {
  constructor(message: string) {
    super(message, ExceptionCode.EMAIL_REGISTERED);
  }
}
