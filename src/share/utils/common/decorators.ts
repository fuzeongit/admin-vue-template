/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-types
export function applyDecorators<TFunction extends Function, Y>(
  ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
) {
  return (target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => {
    decorators.forEach(decorator => {
      if (target instanceof Function && !descriptor) {
        // @ts-ignore
        decorator(target);
      } else {
        // @ts-ignore
        decorator(target, propertyKey, descriptor);
      }
    });
  };
}
