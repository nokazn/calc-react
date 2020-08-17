import React, { FC, useContext } from 'react';
// @ts-ignore @todo
import MathJax from 'react-mathjax2';

import { AppContext } from '../App';

type Props = {
  name: string
  className: string
  mathContent: string
}

export const Button: FC<Props> = (props) => {
  const {
    onNum,
    onBinaryOpe,
    onUnaryOpe,
    onEqu,
    onClearAll,
    onCancel,
    onBackSpace,
  } = useContext(AppContext);
  const onMouseDown = () => {
    switch (props.name) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
        onNum(props.name);
        break;

      case '+':
      case '-':
      case '*':
      case '/':
        onBinaryOpe(props.name);
        break;

      case 'percent':
      case 'root':
      case 'square':
      case 'reciprocal':
      case 'negate':
        onUnaryOpe(props.name);
        break;

      case 'clearAll':
        onClearAll();
        break;

      case 'cancel':
        onCancel();
        break;

      case 'clear':
        onBackSpace();
        break;

      case '=':
        onEqu();
        break;

      default:
        throw new Error('');
    }
  };

  return (
    <button
      name={props.name}
      onMouseDown={onMouseDown}
      className={props.className}
    >
      <MathJax.Context input="ascii">
        <MathJax.Node inline>
          {props.mathContent}
        </MathJax.Node>
      </MathJax.Context>
    </button>
  );
};
