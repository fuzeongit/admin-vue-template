import type { TransformFnParams } from 'class-transformer';
import { Transform } from 'class-transformer';
import { centToYuan, yuanToCent } from '@/share/utils';
import {
  parseArrayTransformFn,
  parseBooleanStringTransformFn,
  parseDateRangeTransformFn,
  parseClearEmptyStringTransformFn
} from './function';

export function ParseArray(defaultValue?: unknown) {
  return Transform((transformFnParams: TransformFnParams) => parseArrayTransformFn(transformFnParams, defaultValue));
}

export function ParseBooleanString() {
  return Transform(parseBooleanStringTransformFn);
}

export function ParseDateRange() {
  return Transform(parseDateRangeTransformFn);
}

export function ParseClearEmptyString() {
  return Transform(parseClearEmptyStringTransformFn);
}

export function ParseCentToYuan() {
  return Transform(({ value }: TransformFnParams) => centToYuan(value));
}

export function ParseYuanToCent() {
  return Transform(({ value }: TransformFnParams) => yuanToCent(value));
}

export function Default(defaultValue: unknown) {
  return Transform(({ value }: TransformFnParams) => {
    return value ?? defaultValue;
  });
}
