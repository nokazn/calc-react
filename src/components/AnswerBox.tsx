import React from 'react';
import { getFontSize } from '../utils/getFontSize';
import { optimizeFontSize } from '../utils/optimizeFontSize';
import { addComma } from '../utils/addComma';
import { convertToZero } from '../utils/convertToZero';

export type Props = {
  provisionalNum: string
  nums: [string, string]
  innerWidth: number
}

type State = {
  defaultFontSize: number
}

export class AnswerBox extends React.Component<Props, State> {
  private elementRef: React.RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      defaultFontSize: props.innerWidth > 767 ? 72 : 56,
    };
  }

  componentDidMount() {
    this.setState({
      defaultFontSize: getFontSize(this.elementRef.current),
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const element = mutation.target.parentElement;
        if (element == null) return;

        const diff = (mutation.target.nodeValue?.length ?? 0) - (mutation.oldValue?.length ?? 0);
        const { innerWidth } = this.props;
        optimizeFontSize({
          element,
          diff,
          innerWidth,
          defaultFontSize: getFontSize(this.elementRef.current),
        });
      });
    });
    const options = {
      characterData: true, // テキストノードの変化を監視
      characterDataOldValue: true,  // テキストノードの古い値を保持
      subtree: true  // 子孫ノードの変化を監視
    };
    if (this.elementRef.current != null) {
      observer.observe(this.elementRef.current, options);
    }
  }

  render() {
    const {
      provisionalNum,
      nums,
    } = this.props;
    return (
      <div
        ref={this.elementRef}
        className="box answer-box">
        <span>
          {addComma(convertToZero(
            provisionalNum || nums[1]
          ))}
        </span>
      </div>
    )
  }
}
