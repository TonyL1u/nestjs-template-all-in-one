import { ExceptionCode } from '@/common/constants';

import { CustomException } from './custom.exception';

export class WrongPasswordException extends CustomException {
  constructor(message: string) {
    super(message, ExceptionCode.WRONG_PASSWORD);
  }
}
