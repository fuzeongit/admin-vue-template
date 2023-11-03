export const loginModuleLabels: Record<UnionKey.LoginModule, string> = {
  'pwd-login': '账密登录',
  register: '注册',
  'reset-pwd': '重置密码',
  'github-login': 'Github绑定'
};

export enum QueryParamsType {
  String,
  Number,
  Select,
  MultiSelect,
  DateRange,
  Date,
  AutoComplete,
  Cascader
}
