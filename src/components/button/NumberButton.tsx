import React, { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../App';
import { Button } from './Button';
import { Num } from '../../types';
import { enqueue } from '../../utils';

type Props = {
  name: string;
  mathContent: string;
  className?: string;
};

const updateProvisionalNum = (prev: string, input: Num): string => {
  if (input === '.') {
    return prev === '' ? '0.' : `${prev}.`;
  }
  return prev === '0' ? input : `${prev}${input}`;
};

const View: FC<Props> = (props) => {
  const {
    provisionalNum,
    opes,
    provisionalOpe,
    tmpFormulaHistory,
    setProvisionalNum,
    setOpes,
    setProvisionalOpe,
    setTmpFormulaHistory,
  } = useContext(AppContext);

  const onNum = (input: Num): void => {
    // すでに小数点が入力されていて、更に小数点が入力されたら何もしない
    if (input === '.' && provisionalNum.includes('.')) return;

    const enqueuedOpes = enqueue(opes, provisionalOpe);
    const updatedProvisionalNum = updateProvisionalNum(provisionalNum, input);
    const updatedTmpFormulaHistory = {
      ...tmpFormulaHistory,
      opes: [...tmpFormulaHistory.opes, enqueuedOpes[1]],
    };

    setProvisionalNum(updatedProvisionalNum);
    // 仮の二項演算子が確定する
    if (provisionalOpe) {
      setOpes(enqueuedOpes);
      setProvisionalOpe('');
      setTmpFormulaHistory(updatedTmpFormulaHistory);
    }
  };

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (/^[0-9]$|\./.test(e.key)) {
        onNum(e.key as Num);
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
      handler={onNum}
      className={props.className}
      // @ts-ignore @todo
      // className={props.name === '.' ? 'unary-ope-button' : 'num-button'}
    />
  );
};

export const NumberButton = styled(View)`
  background-color: #fafafa;
  font-size: 28px;
  font-weight: bold;

  &[data-is-active='true'],
  &:hover {
    background-color: #e6e6e6;
  }

  &:focus {
    border-style: none;
  }
`;
