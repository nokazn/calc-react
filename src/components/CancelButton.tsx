import React, { useContext, FC, useEffect } from 'react';

import { AppContext } from '../App';
import { Button } from './Button';

type Props = {
  name: string;
  mathContent: string;
};

export const CancelButton: FC<Props> = (props) => {
  const { setProvisionalNum, setProvisionalTmpFormulaNum } = useContext(AppContext);

  const onCancel = (): void => {
    setProvisionalNum('');
    setProvisionalTmpFormulaNum('');
  };

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === 'Delete') {
        onCancel();
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
      handler={onCancel}
      className={'unary-ope-button'}
    />
  );
};
