import { OPE_LIST } from '../constant';
import { Ope, Num } from '../types';

export const isCalculatable = (nums: [Num | '', Num | ''], ope: Ope | ''): boolean => {
  return !Number.isNaN(parseFloat(nums[0]))
    && !Number.isNaN(parseFloat(nums[1]))
    && OPE_LIST.some((availableOpe) => ope === availableOpe);
};
