import { encrypto, decrypto } from '../crypto';

export function setSession(key: string, value: unknown) {
  const json = encrypto(value);
  sessionStorage.setItem(key, json);
}

export function getSession<T>(key: string, defaultValue?: T) {
  const json = sessionStorage.getItem(key);
  let data: T | undefined;
  if (json) {
    try {
      data = decrypto(json);
    } catch {
      // 防止解析失败
    }
  }
  return data ?? defaultValue;
}

export function removeSession(key: string) {
  window.sessionStorage.removeItem(key);
}

export function clearSession() {
  window.sessionStorage.clear();
}
