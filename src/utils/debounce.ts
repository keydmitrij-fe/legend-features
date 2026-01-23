export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  delay: number,
) => {
  let timeout: number

  return function (...args: Parameters<F>) {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
