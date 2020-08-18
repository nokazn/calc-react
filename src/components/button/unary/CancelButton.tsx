import React, { useContext, FC, useEffect } from 'react';

import { AppContext } from '../../../App';
import { StyledUnaryOpeButton } from './UnaryOpeButton.style';

type Props = {
  name: string;
  mathContent: string;
  className?: string;
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
    <StyledUnaryOpeButton
      name={props.name}
      mathContent={props.mathContent}
      handler={onCancel}
      className={props.className}
    />
  );
};
