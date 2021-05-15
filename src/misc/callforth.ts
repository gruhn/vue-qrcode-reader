export const eventOn = (
  eventTarget: any,
  successEvent: string,
  errorEvent = 'error'
) => {
  let $resolve: (value: unknown) => void
  let $reject: (reason?: any) => void

  const promise = new Promise(
    (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      $resolve = resolve
      $reject = reject

      eventTarget.addEventListener(successEvent, $resolve)
      eventTarget.addEventListener(errorEvent, $reject)
    }
  )

  promise.finally(() => {
    eventTarget.removeEventListener(successEvent, $resolve)
    eventTarget.removeEventListener(errorEvent, $reject)
  })

  return promise
}

export const timeout = (milliseconds: number) => {
  return new Promise((resolve: (value: unknown) => void) => setTimeout(resolve, milliseconds))
}

export const polling = async (predicate: any, options: { maxTries: number; interval: number }) => {
  const { maxTries = 10, interval = 10 } = options

  if (maxTries <= 0) {
    // reject
    throw undefined
  } else if (predicate()) {
    // resolve
    return undefined
  } else {
    await timeout(interval)
    await polling(predicate, { maxTries: maxTries - 1, interval })
  }
}
