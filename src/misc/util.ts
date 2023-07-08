
/**
 * Takes a function `action` and returns a new function, that behaves
 * like action but when called a second time does nothing.
 */
export const indempotent = <T>(action: (x: any) => T) => {
  let called = false
  let result: T | undefined = undefined

  return (...args: any[]) => {
    if (called) {
      return result
    } else {
      result = action(args)
      called = true

      return result
    }
  }
}
