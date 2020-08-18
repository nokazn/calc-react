import React, { useContext, FC } from 'react';

import { AppContext } from '../App';
import { Button } from './Button';
import type { UnaryOpe, Handler } from '../types';

type Props = {
  name: string;
  mathContent: string;
};

export const UnaryOpeButton: FC<Props> = (props) => {
  const {
    provisionalNum,
    nums,
    provisionalTmpFormulaNum,
    setProvisionalNum,
    setProvisionalTmpFormulaNum,
  } = useContext(AppContext);

  const onUnaryOpe = (type: UnaryOpe): void => {
    const handlers: { [k: string]: Handler } = {
      percent({ value }) {
        const answer = String(value / 100);
        return {
          formula: answer,
          value: answer,
        };
      },
      root({ formula, value }) {
        return {
          formula: `√(${formula})`,
          value: String(Math.sqrt(value)),
        };
      },
      square({ formula, value }) {
        return {
          formula: `sqr(${formula})`,
          value: String(Math.pow(value, 2)),
        };
      },
      reciprocal({ formula, value }) {
        return {
          formula: `1/(${formula})`,
          value: value !== 0 ? String(1 / value) : 'NaN',
        };
      },
      negate({ formula, value }) {
        return {
          formula: `negate(${formula})`,
          value: String(value * -1),
        };
      },
    };
    // 入力中の値か、なければ前回の答えを計算して入力値を更新
    const inputNum = provisionalNum || nums[1] || '0';
    const answer = handlers[type]({
      // @todo
      formula: provisionalTmpFormulaNum || inputNum,
      value: parseFloat(inputNum),
    });

    setProvisionalNum(answer.value);
    setProvisionalTmpFormulaNum(answer.formula);
  };

  return (
    <Button
      name={props.name}
      mathContent={props.mathContent}
      handler={onUnaryOpe}
      className={'unary-ope-button'}
    />
  );
};
