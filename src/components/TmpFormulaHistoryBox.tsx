import React from 'react';
import { getFontSize } from '../utils/getFontSize';
import { optimizeFontSize } from '../utils/optimizeFontSize';

export type Props = {
  innerWidth: number
  tmpFormulaHistory: {
    nums: string[]
    opes: string[]
  }
  provisionalOpe: string
  provisionalTmpFormulaNum: string
}

type State = {
  defaultFontSize: number
}

export class TmpFormulaHistoryBox extends React.Component<Props, State> {
  private elementRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      defaultFontSize: 24,
    };
  }

  componentDidMount() {
    this.setState({
      defaultFontSize: getFontSize(this.elementRef.current),
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const element = mutation.target.parentElement;
        const diff = mutation.target.data.length - mutation.oldValue.length;
        optimizeFontSize({
          diff,
          element,
          innerWidth: this.props.innerWidth,
          defaultFontSize: getFontSize(this.elementRef.current),
        });
      });
    });
    const options = {
      characterData: true, // テキストノードの変化を監視
      characterDataOldValue: true,  // テキストノードの古い値を保持
      subtree: true  // 子孫ノードの変化を監視
    };
    observer.observe(this.elementRef.current, options);
  }

  render() {
    const {
      tmpFormulaHistory,
      provisionalOpe,
      provisionalTmpFormulaNum,
    } = this.props;

    const provisionalTmpFormula = tmpFormulaHistory.nums.map((num, i) => {
      const ope = tmpFormulaHistory.opes[i];
      return `${num}${ope ?? ''}`;
    }).join('') + provisionalOpe + provisionalTmpFormulaNum;

    return (
      <div
        ref={this.elementRef}
        className="box tmp-formula-history-box">
        <span>{provisionalTmpFormula}</span>
      </div>
    )
  }
}
