import React, { FC, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Box } from './Box.style';
import { getFontSize, optimizeFontSize, addComma, convertToZero } from '../../utils';

export type Props = {
  provisionalNum: string;
  nums: [string, string];
  innerWidth: number;
  className?: string;
};

const View: FC<Props> = (props) => {
  const [, setDefaultFontSize] = useState(props.innerWidth > 767 ? 72 : 56);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current == null) return;

    setDefaultFontSize(getFontSize(elementRef.current));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const element = mutation.target.parentElement;
        if (element == null) return;

        const diff = (mutation.target.nodeValue?.length ?? 0) - (mutation.oldValue?.length ?? 0);
        const { innerWidth } = props;
        optimizeFontSize({
          element,
          diff,
          innerWidth,
          defaultFontSize: getFontSize(elementRef.current),
        });
      });
    });
    const options = {
      characterData: true, // テキストノードの変化を監視
      characterDataOldValue: true, // テキストノードの古い値を保持
      subtree: true, // 子孫ノードの変化を監視
    };
    observer.observe(elementRef.current, options);

    return () => {
      observer.disconnect();
    };
  }, [props]);

  return (
    <Box ref={elementRef} className={props.className}>
      <span>{addComma(convertToZero(props.provisionalNum || props.nums[1]))}</span>
    </Box>
  );
};

export const AnswerBox = styled(View)`
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 56px;
  }

  @media (min-width: 768px) {
    font-size: 72px;
  }
`;
