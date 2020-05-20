import { OPE_LIST } from '../constant';

export const isCalculatable = (nums, ope) => {
  return !Number.isNaN(parseFloat(nums[0]))
    && !Number.isNaN(parseFloat(nums[1]))
    && OPE_LIST.some((availableOpe) => ope === availableOpe);
}
