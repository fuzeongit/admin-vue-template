/**
 * 数组的工具类
 */

/**
 * 打乱数组
 * @param array 数组
 * @returns
 */
export function shuffle(array: any[]) {
  const newArray = array.slice();
  for (let i = 0; i < newArray.length; i += 1) {
    const j = Math.floor(Math.random() * i);
    const t = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = t;
  }
  return newArray;
}

/**
 * 数组求和
 * @param array 数组
 */
export function getSum(array: number[]) {
  return array.reduce((prev, curr) => prev + curr, 0);
}

/**
 * 数组去重
 * @param array 数组
 */
export function uniq(array: any[]) {
  return Array.from(new Set(array));
}

/**
 * 数组求平均值
 * @param array 数组
 */
export function getAverage(array: number[]) {
  return getSum(array) / array.length;
}

/**
 * 数组求中位数
 * @param array 数组
 */
export function getMedian(array: number[]) {
  const newArray = array.sort((a, b) => a - b);
  const mid = Math.floor(newArray.length / 2);
  return newArray.length % 2 !== 0 ? newArray[mid] : (newArray[mid - 1] + newArray[mid]) / 2;
}

/**
 * 一维数组转二维数组
 * @param array 数组
 * @param row 切割的长度
 * @returns
 */
export function toTwoDimension<T>(array: T[], row: number) {
  const newArray: T[][] = [];
  for (let i = 0; i < array.length; i += row) {
    newArray.push(array.slice(i, i + row));
  }
  return newArray;
}

/**
 * 获取数组中最小值下标
 * @param array 数组
 * @returns
 */
export function getMinIndex(array: number[]) {
  return array.indexOf(Math.min(...array));
}

/**
 * 获取数组中最大值下标
 * @param array 数组
 * @returns
 */
export function getMaxIndex(array: number[]) {
  return array.indexOf(Math.max(...array));
}
