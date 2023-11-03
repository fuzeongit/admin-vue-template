import type { TransformFnParams } from 'class-transformer';

/**
 * 参数转换器
 */

/**
 * 将query传入数组数为1的参数转换为数组
 * @param { value } 传入的值
 * @param defaultValue  默认值
 * @returns
 */
export function parseArrayTransformFn({ value }: TransformFnParams, defaultValue?: any) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value !== undefined) {
    return [value];
  }
  return defaultValue ? [defaultValue] : [];
}

/**
 * 将传入的值变为布尔值
 * @param {value} 传入的值
 * @returns
 */
export function parseBooleanStringTransformFn({ value }: TransformFnParams) {
  return value === 'true';
}

/**
 * 将传入的值变为dateRange字符串，如：[Date,undefined]
 * @param {value} 传入的值
 * @returns
 */
export function parseDateRangeTransformFn({ value }: TransformFnParams) {
  const dateRange: Array<Date | undefined> = [undefined, undefined];
  if (Array.isArray(value)) {
    value
      .filter((_it, i) => i < 2)
      .forEach((_it, i) => {
        dateRange[i] = value[i] ? new Date(value[i]) : undefined;
      });
  } else if (value !== undefined && value !== '') {
    dateRange[0] = new Date(value);
  }
  return dateRange;
}

/**
 *  将传入的空值转换为undefined
 * @param {value} 传入的值
 * @returns
 */
export function parseClearEmptyStringTransformFn({ value }: TransformFnParams) {
  return value.length === 0 ? undefined : value;
}
