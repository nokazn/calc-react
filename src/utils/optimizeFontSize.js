import { getFontSize } from './getFontSize';

/**
 * @param { diff: number, element: Element, innerWidth: number, defaultFontSize: number} 
 * @return {void}
 */
export const optimizeFontSize = ({
  diff = 0,
  element,
  innerWidth,
  defaultFontSize,
}) => {
  // childEle の親要素の padding が左右で 2% ずつなのを考慮
  let spanRatio = element.clientWidth / (innerWidth * (1 - 0.02 * 2));
  let fontSize = getFontSize(element);
  // 文字が追加され、親要素の幅をオーバーする場合
  if (diff >= 0 && spanRatio >= 1) {
    fontSize = fontSize / spanRatio;
    element.style.fontSize = `${fontSize}px`;
  // 文字が削除され、親要素の幅に余裕ができる場合、デフォルトサイズを超えない範囲で文字サイズ大きくする
  } else if (diff <= 0 && spanRatio < 1) {
    fontSize = fontSize / spanRatio < defaultFontSize
      ? fontSize /spanRatio
      : defaultFontSize;
    element.style.fontSize = `${fontSize}px`;
  }
}
