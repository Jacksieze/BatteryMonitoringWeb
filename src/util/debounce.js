export const debounce = (func, delay) => {
  // 스크롤 성능 최적화를 위한 debounce
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};
