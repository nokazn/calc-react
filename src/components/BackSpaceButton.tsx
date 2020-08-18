import React, { useContext, FC, useEffect } from 'react';

import { AppContext } from '../App';
import { Button } from './Button';

type Props = {
  name: string;
  mathContent: string;
};

export const BackSpaceButton: FC<Props> = (props) => {
  const { provisionalNum, provisionalTmpFormulaNum, setProvisionalNum } = useContext(AppContext);

  const onBackSpace = (): void => {
    if (provisionalTmpFormulaNum !== '') return;

    const updatedProvisionalNum = provisionalNum.length === 1 ? '0' : provisionalNum.slice(0, -1);
    setProvisionalNum(updatedProvisionalNum);
  };

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        onBackSpace();
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
      handler={onBackSpace}
      className={'unary-ope-button'}
    />
  );
};
