/* eslint-disable no-param-reassign */

/** 统一失败和成功的请求结果的数据类型 */
export async function handleServiceResult<T = any>(error?: Service.RequestError | null, data?: T) {
  if (error) {
    throw error;
  }
  return data;
}
