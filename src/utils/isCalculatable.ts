import { OPE_LIST } from '../constant';
import { Ope } from '../types';

export const isCalculatable = (nums: [string, string], ope: Ope): boolean => {
  return !Number.isNaN(parseFloat(nums[0]))
    && !Number.isNaN(parseFloat(nums[1]))
    && OPE_LIST.some((availableOpe) => ope === availableOpe);
};
