import { OPE_LIST } from '../constant';
import { BinaryOpe, TwoTupple } from '../types';

export const isCalculatable = (nums: TwoTupple<string>, ope: BinaryOpe | ''): boolean => {
  return (
    !Number.isNaN(parseFloat(nums[0])) &&
    !Number.isNaN(parseFloat(nums[1])) &&
    OPE_LIST.some((availableOpe) => ope === availableOpe)
  );
};
