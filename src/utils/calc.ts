import { BinaryOpe } from '../types';

export const calc = (nums: [string, string], ope: BinaryOpe): string => {
  const numList = nums.map(parseFloat) as [number, number];
  switch (ope) {
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
};
