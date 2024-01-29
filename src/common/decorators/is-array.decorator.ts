import type { ValidationOptions } from 'class-validator';
import { isArray, ValidateBy } from 'class-validator';

/**
 * Checks if a given value is an array
 */
export function IsArray(memberType?: 'string' | 'number' | 'boolean', validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isArray',
      validator: {
        validate: value => {
          const check = isArray(value);
          if (!check) return false;

          if (memberType) {
            return value.map(v => typeof v).every(t => t === memberType);
          }

          return true;
        },
        defaultMessage: args => `${args?.property} type error`
      }
    },
    validationOptions
  );
}
