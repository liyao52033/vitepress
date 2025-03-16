/**
 * 防抖函数
 * @param func 执行
 * @param delay 延迟时间
 * @param immediate 是否立即执行，如果为 true，则调用 func立后即执行，否则在延迟时间后执行
 */
export const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate = true
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    const later = () => {
      timeoutId = null as any;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, delay);

    if (callNow) func.apply(context, args);
  };
};
