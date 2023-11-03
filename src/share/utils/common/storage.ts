/**
 * @author Zeongit
 * 本地存储的工具类
 */

export const localSet = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};
export const localGet = <T>(key: string, defaultValue?: T) => {
  const serializeValue = localStorage.getItem(key);
  if (serializeValue) {
    try {
      return JSON.parse(serializeValue);
    } catch {
      return serializeValue;
    }
  } else {
    return defaultValue;
  }
};
export const sessionSet = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
  return value;
};
export const sessionGet = <T>(key: string, defaultValue?: T) => {
  const serializeValue = sessionStorage.getItem(key);
  if (serializeValue) {
    try {
      return JSON.parse(serializeValue);
    } catch {
      return serializeValue;
    }
  } else {
    return defaultValue;
  }
};
