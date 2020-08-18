import React, { FC, useRef, useState, useEffect, useMemo } from 'react';
import { getFontSize, optimizeFontSize } from '../utils';

export type Props = {
  innerWidth: number
  tmpFormulaHistory: {
    nums: string[]
    opes: string[]
  }
  provisionalOpe: string
  provisionalTmpFormulaNum: string
}

const DEFAULT_FONT_SIZE = 24;

// export class TmpFormulaHistoryBox extends React.Component<Props, State> {
export const TmpFormulaHistoryBox: FC<Props> = (props) => {
  const [, setDefaultFontSize] = useState(DEFAULT_FONT_SIZE);
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current == null) return;

    setDefaultFontSize(getFontSize(elementRef.current));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const element = mutation.target.parentElement;
        if (element == null) return;

        const diff = (mutation.target.nodeValue?.length ?? 0) - (mutation.oldValue?.length ?? 0);
        optimizeFontSize({
          diff,
          element,
          innerWidth: props.innerWidth,
          defaultFontSize: getFontSize(elementRef.current),
        });
      });
    });
    const options: MutationObserverInit = {
      characterData: true, // テキストノードの変化を監視
      characterDataOldValue: true,  // テキストノードの古い値を保持
      subtree: true,  // 子孫ノードの変化を監視
    };
    observer.observe(elementRef.current, options);

    return () => {
      observer.disconnect();
    };
  }, [props]);

  const {
    tmpFormulaHistory,
    provisionalOpe,
    provisionalTmpFormulaNum,
  } = props;

  const provisionalTmpFormula = useMemo(() => {
    return tmpFormulaHistory.nums.map((num, i) => {
      const ope = tmpFormulaHistory.opes[i];
      return `${num}${ope ?? ''}`;
    }).join('') + provisionalOpe + provisionalTmpFormulaNum;
  }, [tmpFormulaHistory, provisionalOpe, provisionalTmpFormulaNum])

  return (
    <div
      ref={elementRef}
      className="box tmp-formula-history-box">
      <span>{provisionalTmpFormula}</span>
    </div>
  );
};
