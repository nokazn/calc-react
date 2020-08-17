import React, { FC } from 'react';
// @ts-ignore @todo
import MathJax from 'react-mathjax2';

type Props = {
  name: string
  className: string
  content: string
  // @todo
  handler: (args: any) => void
  arg: string | undefined
}

export const Button: FC<Props> = (props) => {
  const onMouseDown = () => {
    props.handler(props.arg);
  };

  return (
    <button
      name={props.name}
      onMouseDown={onMouseDown}
      className={props.className}
    >
      <MathJax.Context input="ascii">
        <MathJax.Node inline>
          {props.content}
        </MathJax.Node>
      </MathJax.Context>
    </button>
  );
};
