import { StorageKey } from '@/constants';
import { getLocal, removeLocal, setLocal } from '@/share/utils';

/** 设置token */
export function setToken(token: AuthModule.TokenVo) {
  setLocal(StorageKey.token, token);
}

/** 获取token */
export function getToken() {
  return getLocal<AuthModule.TokenVo>(StorageKey.token);
}

/** 去除token */
export function removeToken() {
  removeLocal(StorageKey.token);
}

/** 获取用户信息 */
export function getCustomerInfo() {
  return getLocal<AuthModule.CustomerVo>(StorageKey['customer-info']);
}

/** 设置用户信息 */
export function setCustomerInfo(info: AuthModule.CustomerVo) {
  setLocal(StorageKey['customer-info'], info);
}

/** 去除用户信息 */
export function removeCustomerInfo() {
  removeLocal(StorageKey['customer-info']);
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  removeToken();
  removeCustomerInfo();
}
