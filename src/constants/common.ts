export const dataTypeLabels: { [K in TypeUtil.DataTypeStringKey]: TypeUtil.DataTypeString<K> } = {
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',
  object: '[object Object]',
  function: '[object Function]',
  array: '[object Array]',
  date: '[object Date]',
  regExp: '[object RegExp]',
  promise: '[object Promise]',
  set: '[object Set]',
  map: '[object Map]',
  file: '[object File]'
};

/** 缓存的key */
export enum StorageKey {
  /** 主题颜色 */
  'theme-color' = '__THEME_COLOR__',
  /** 用户token */
  'token' = '__TOKEN__',
  /** 用户刷新token */
  'refresh-token' = '__REFRESH_TOKEN__',
  /** 用户信息 */
  'customer-info' = '__CUSTOMER_INFO__',
  /** 多页签路由信息 */
  'tab-routes' = '__TAB_ROUTES__',
  /** 语言信息 */
  'language' = '__LANGUAGE__'
}
