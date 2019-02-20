export function hasFired(eventTarget, successEvent, errorEvent = "error") {
  let $resolve, $reject;

  const promise = new Promise((resolve, reject) => {
    $resolve = resolve;
    $reject = reject;
  });

  eventTarget.addEventListener(successEvent, $resolve);
  eventTarget.addEventListener(errorEvent, $reject);

  promise.finally(() => {
    eventTarget.removeEventListener(successEvent, $resolve);
    eventTarget.removeEventListener(errorEvent, $reject);
  });

  return promise;
}
