import React, { FC } from 'react';
// @ts-ignore @todo
import MathJax from 'react-mathjax2';

type Props = {
  name: string;
  className: string;
  mathContent: string;
  handler: (...args: any[]) => void;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      name={props.name}
      onMouseDown={() => props.handler(props.name)}
      className={props.className}
    >
      <MathJax.Context input='ascii'>
        <MathJax.Node inline>{props.mathContent}</MathJax.Node>
      </MathJax.Context>
    </button>
  );
};
