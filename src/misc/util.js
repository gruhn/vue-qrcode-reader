export const indempotent = action => {
  let called = false;
  let result = undefined;

  return (...args) => {
    if (called) {
      return result;
    } else {
      result = action(...args);
      called = true;

      return result;
    }
  };
};
