/** this指向绑定 */
export const Bound: MethodDecorator = (target, propertyKey, descriptor) => {
  const method: any = descriptor.value;

  if (!method) return;

  return {
    configurable: true,
    get() {
      const bound = method.bind(this);
      return bound;
    }
  };
};
