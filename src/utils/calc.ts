import { Ope } from '../types';

/**
 * @param {[string, string]} nums
 * @param {'+' | '-' | '*' | '/'} ope
 * @return {string}
 */
export const calc = (nums: [string, string], ope: Ope): string => {
  const numList = nums.map(parseFloat) as [number, number];
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