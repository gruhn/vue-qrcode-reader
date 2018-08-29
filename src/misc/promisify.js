
export function hasFired (element, successEvent, errorEvent) {
  return new Promise((resolve, reject) => {
    element.addEventListener(successEvent, resolve, { once: true })

    if (errorEvent !== undefined) {
      element.addEventListener(errorEvent, reject, { once: true })
    }
  })
}
