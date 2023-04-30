// Throttler
export const throttle =(func) =>{
  let timeout;
  return function(...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
      },400);
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