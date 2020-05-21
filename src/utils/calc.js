/**
 * @param {[string, string]} nums 
 * @param {'+' | '-' | '*' | '/'} ope 
 * @return {string}
 */
export const calc = (nums, ope) => {
  const numList = nums.map(parseFloat);
  switch(ope) {
    case '+':
      return (numList[0] + numList[1]).toString();
    case '-':
      return (numList[0] - numList[1]).toString();
    case '*':
      return (numList[0] * numList[1]).toString();
    case '/':
      return (numList[0] / numList[1]).toString();
    default:
      return 'NaN';
  }
}