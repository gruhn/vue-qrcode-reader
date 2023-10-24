export const eventOn = (
  eventTarget: EventTarget,
  successEvent: string,
  errorEvent = 'error'
): Promise<Event> => {
  let $resolve: (value: Event) => void
  let $reject: (reason?: Event) => void

  const promise = new Promise(
    (resolve: (value: Event) => void, reject: (reason?: Event) => void) => {
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
