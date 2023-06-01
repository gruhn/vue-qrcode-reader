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
