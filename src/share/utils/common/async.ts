/**
 * 异步工具类
 */

/**
 * 沉睡函数
 * @param ms 毫秒数
 */
export function sleep(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 *
 * @param asyncFun 异步函数
 * @param ms 毫秒数
 */
export async function leastSleep<T>(asyncFun: Promise<T>, ms: number) {
  const [result] = await Promise.all([asyncFun, sleep(ms)]);
  return result;
}
