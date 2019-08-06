/**
 *
 * @param {number} index
 */
function fib(index) {
  if (index === 0) {
    return 0;
  }
  if (index <= 2) {
    return 1;
  }
  let prev1 = 1;
  let prev2 = 1;
  let fibRes = 0;
  for (let i = 2; i < index; ++i) {
    fibRes = prev1 + prev2;
    prev2 = prev1;
    prev1 = fibRes;
  }
  return fibRes;
}

module.exports = fib;
