import { customAlphabet } from 'nanoid';

export interface CreateNanoidOptions {
  prefix?: string;
  length?: number;
  withDate?: boolean;
}

export function createNanoid(options: CreateNanoidOptions = {}) {
  const { prefix, length = 12, withDate = true } = options;
  const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', length);
  const unique = withDate ? `${nanoid(length)}-${(+new Date()).toString().slice(6)}` : nanoid(length);

  return prefix ? `${prefix}-${unique}` : unique;
}
