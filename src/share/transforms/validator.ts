/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { Validate, ValidatorConstraint } from 'class-validator';
import { isDate } from '../utils';

@ValidatorConstraint({ name: 'isDateRange', async: false })
class CustomDateRange implements ValidatorConstraintInterface {
  validate(text: Array<Date | string | number | undefined>, args: ValidationArguments) {
    return text.every(it => {
      return (
        (['string', 'number'].includes(typeof it) && !isDate(new Date(it as string | number))) ||
        isDate(it) ||
        it === undefined
      );
    });
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'dateRange must be a date or undefined';
  }
}

export function IsDateRange(validationOptions?: ValidationOptions) {
  return Validate(CustomDateRange, validationOptions);
}
