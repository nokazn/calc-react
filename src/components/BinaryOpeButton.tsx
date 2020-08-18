import React, { useContext, FC, useEffect } from 'react';

import { AppContext } from '../App';
import { Button } from './Button';
import { enqueue, isCalculatable } from '../utils';
import type { BinaryOpe } from '../types';

type Props = {
  name: string;
  mathContent: string;
};

export const BinaryOpeButton: FC<Props> = (props) => {
  const {
    provisionalNum,
    provisionalOpe,
    nums,
    opes,
    tmpFormulaHistory,
    provisionalTmpFormulaNum,
    setProvisionalNum,
    setProvisionalOpe,
    setNums,
    setProvisionalTmpFormulaNum,
    setTmpFormulaHistory,
    calculate,
  } = useContext(AppContext);

  const onBinaryOpe = (input: BinaryOpe): void => {
    const inputNum = provisionalNum || nums[1] || '0';
    const enqueuedNums = enqueue(nums, inputNum);

    // 仮の二項演算子があっても上書きする
    setProvisionalOpe(input);
    if (!provisionalOpe) {
      // 仮の数字を確定し、仮の二項演算子を設定
      setNums(enqueuedNums);
      setProvisionalNum('');
      setProvisionalTmpFormulaNum('');
      setTmpFormulaHistory({
        ...tmpFormulaHistory,
        nums: [...tmpFormulaHistory.nums, provisionalTmpFormulaNum || inputNum],
      });
    }
    // @todo
    if (opes[1] !== '' && isCalculatable(enqueuedNums, opes[1])) {
      calculate(enqueuedNums, opes[1]);
    }
  };

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (/^\+|-|\*|\/$/.test(e.key)) {
        onBinaryOpe(e.key as BinaryOpe);
      }
    };
    document.addEventListener('keydown', eventListener);

    return () => {
      document.removeEventListener('keydown', eventListener);
    };
  });

  return (
    <Button
      name={props.name}
      mathContent={props.mathContent}
      handler={onBinaryOpe}
      className={'binary-ope-button'}
    />
  );
};
