import React, { useContext, FC, useEffect } from 'react';

import { AppContext } from '../App';
import { Button } from './Button';
import { enqueue } from '../utils';

type Props = {
  name: string
  mathContent: string
}

export const EqualButton: FC<Props> = (props) => {
  const {
    provisionalNum,
    provisionalOpe,
    nums,
    opes,
    setProvisionalOpe,
    setNums,
    setOpes,
    setProvisionalTmpFormulaNum,
    setTmpFormulaHistory,
    calculate,
  } = useContext(AppContext);

  const onEqu = (): void => {
    if (!nums[1]) return;

    // 仮の数字がない場合、仮の二項演算子がある場合は前回の答え (現在表示されている数値) を採用
    const enqueuedNum = provisionalNum || nums[provisionalOpe ? 1 : 0];
    const enqueuedNums = enqueue(nums, enqueuedNum);
    setNums(enqueuedNums);
    setProvisionalOpe('');
    setProvisionalTmpFormulaNum('');
    setTmpFormulaHistory({
      nums: [],
      opes: [],
    });

    if (opes[1]) {
      calculate(enqueuedNums, opes[1]);
    } else {
      // 仮の二項演算子がない場合 (答えが出た後 onEqu が呼ばれた場合) は前回の入力値を採用
      const enqueuedOpes = enqueue(opes, provisionalOpe || opes[0]);
      setOpes(enqueuedOpes);
      if (enqueuedOpes[1] !== '') {
        calculate(enqueuedNums, enqueuedOpes[1]);
      }
    }
  };

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === '=') {
        onEqu();
      }
    };
    document.addEventListener('keydown', eventListener);

    return () => {
      document.removeEventListener('keydown', eventListener);
    }
  });

  return (
    <Button
      name={props.name}
      mathContent={props.mathContent}
      handler={onEqu}
      className={'binary-ope-button'}
    />
  );
};
