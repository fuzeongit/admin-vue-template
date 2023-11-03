/**
 * 对象的工具类
 */

/**
 * 根据键值列表判断对象是否相等
 * @param obj1 对象1
 * @param obj2 对象2
 * @param keys 键值列表
 */
export function equalObjectByKeys(obj1: any, obj2: any, keys: string[]) {
  return keys.every(key => obj1[key] === obj2[key]);
}

/**
 * 消去null，用undefined代替
 * @param value
 * @returns
 */
export function removeNull<T>(value: T | null) {
  if (value === null) return undefined;
  return value;
}

/**
 *  空函数
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

/** 设置对象数据 */
export function objectAssign<T extends Record<string, any>>(target: T, source: Partial<T>) {
  Object.assign(target, source);
}
