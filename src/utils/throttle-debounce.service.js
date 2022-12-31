// Throttler
export const throttle =(func, ...args) =>{
  let timeout;
  return function() {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
      }, 600);
      func(...args);
    }
  };
}
// Debounce function
export const debounce = ((func, ...args) =>{
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), 600);
  };
})