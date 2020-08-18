import React, { FC } from 'react';
import styled from 'styled-components';
// @ts-ignore @todo
import MathJax from 'react-mathjax2';

type Props = {
  name: string;
  mathContent: string;
  handler: (...args: any[]) => void;
  className?: string;
};

const View: FC<Props> = (props) => {
  return (
    <button onMouseDown={() => props.handler(props.name)} className={props.className}>
      <MathJax.Context input='ascii'>
        <MathJax.Node inline>{props.mathContent}</MathJax.Node>
      </MathJax.Context>
    </button>
  );
};

export const Button = styled(View)`
  border-style: none;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  margin: 0.7px;
`;
