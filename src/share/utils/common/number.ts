/**
 * 数字的工具类
 */

/**
 * 转化为百分比字符串
 * @param value
 * @param precision
 * @returns
 */
export function toPercent(value: number, precision = 2) {
  return `${value.toFixed(precision)}%`;
}

/**
 * 最大显示数字
 * @param value
 * @param threshold
 * @returns
 */
export function toMore(value: number, threshold: number) {
  return value > threshold ? threshold : value;
}

/**
 * 最小显示数字
 * @param value
 * @param threshold
 * @returns
 */
export function toLess(value: number, threshold: number) {
  return value < threshold ? threshold : value;
}

/**
 * 获取循环的下标
 * @param index 超出范围的下标
 * @param length 长度
 * @returns
 */
export function getLoopValue(index: number, length: number) {
  const temp = index % length;
  return index >= 0 ? temp : length + temp;
}
