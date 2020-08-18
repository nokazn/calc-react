import React, { useContext, FC, useEffect } from 'react';

import { AppContext } from '../App';
import { Button } from './Button';
import { dequeue } from '../utils';

type Props = {
  name: string
  mathContent: string
}

export const ClearAllButton: FC<Props> = (props) => {
  const {
    nums,
    opes,
    setNums,
    setOpes,
    setProvisionalNum,
    setProvisionalOpe,
    setProvisionalTmpFormulaNum,
    setTmpFormulaHistory,
  } = useContext(AppContext);

  const onClearAll = (): void => {
    const dequeuedNums = dequeue(nums, 2)
    const dequeuedOpes = dequeue(opes, 2)

    setNums(dequeuedNums);
    setOpes(dequeuedOpes);
    setProvisionalNum('');
    setProvisionalOpe('');
    setProvisionalTmpFormulaNum('');
    setTmpFormulaHistory({
      nums: [],
      opes: [],
    });
  };

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClearAll();
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
      handler={onClearAll}
      className={'unary-ope-button'}
    />
  );
};
