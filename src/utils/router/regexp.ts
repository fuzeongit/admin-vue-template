/** 获取登录页面模块的动态路由的正则 */
export function getLoginModuleRegExp() {
  const modules: UnionKey.LoginModule[] = ['pwd-login', 'register', 'reset-pwd', 'github-login'];
  return modules.join('|');
}
