/**
 * 混入，如果基类是子类，那基类父类的方法也不会被混入
 * @param derivedCtor 派生类
 * @param baseCtors 基类
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      // eslint-disable-next-line no-param-reassign
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
