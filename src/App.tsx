import React from 'react';
import { Button } from './components/Button';
import { TmpFormulaHistoryBox } from './components/TmpFormulaHistoryBox';
import { AnswerBox } from './components/AnswerBox'
import { buttonList } from './data/buttonList';
import { enqueue } from './utils/enqueue';
import { dequeue } from './utils/dequeue';
import { isCalculatable } from './utils/isCalculatable';
import { calc } from './utils/calc';
import './App.css';
import { Num, Ope, Handler } from './types';

type State = {
  innerWidth: number
  activeButtonName: string | null
  nums: [Num | '', Num | '']
  opes: [Ope | '', Ope | '']
  provisionalNum: string,
  provisionalOpe: string,
  provisionalTmpFormulaNum: string,
  tmpFormulaHistory: {
    nums: string[],
    opes: string[],
  },
}

export class App extends React.Component<{}, State> {
  private eventListener: ((e: KeyboardEvent) => void) | undefined;

  constructor(props: {}) {
    super(props);
    this.eventListener = undefined;
    this.state = {
      innerWidth: 0,
      activeButtonName: null,
      nums: ['', ''],
      opes: ['', ''],
      provisionalNum: '',
      provisionalOpe: '',
      provisionalTmpFormulaNum: '',
      tmpFormulaHistory: {
        nums: [],
        opes: [],
      },
    }

    this.onNum = this.onNum.bind(this);
    this.onPeriod = this.onPeriod.bind(this);
    this.onBinaryOpe = this.onBinaryOpe.bind(this);
    this.onUnaryOpe = this.onUnaryOpe.bind(this);
    this.onEqu = this.onEqu.bind(this);
    this.onClearAll = this.onClearAll.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onBackSpace = this.onBackSpace.bind(this);
    this.calc = this.calc.bind(this);
  }

  componentDidMount() {
    this.setState({
      innerWidth: window.innerWidth,
    });

    const eventListener = (e: KeyboardEvent) => {
      if (/^[0-9]$|\./.test(e.key)) {
        this.onNum(e.key as Num);
      } else if (/^\+|-|\*|\/$/.test(e.key)) {
        this.onBinaryOpe(e.key as Ope);
      } else if (e.key === 'Escape') {
        this.onClearAll();
      } else if (e.key === 'Delete') {
        this.onCancel();
      } else if (e.key === 'Backspace') {
        this.onBackSpace();
      } else if (e.key === 'Enter' || e.key === '=') {
        this.onEqu();
      }
    };
    document.addEventListener('keydown', eventListener);
    this.eventListener = eventListener;
  }

  componentWillUnmount() {
    if (this.eventListener != null) {
      document.removeEventListener('keydown', this.eventListener);
    }
  }

  /**
   * 数字が入力された場合
   */
  onNum(inputNum: Num) {
    const {
      provisionalNum,
      provisionalOpe,
      opes,
      tmpFormulaHistory
    } = this.state;
    const enqueuedOpes = enqueue(opes, provisionalOpe);
    const updatedProvisionalNum = provisionalNum === '0'
      ? inputNum
      : `${provisionalNum}${inputNum}`;
    const updatedTmpFormulaHistory = {
      ...tmpFormulaHistory,
      opes: [...tmpFormulaHistory.opes, enqueuedOpes[1]]
    };

    if (!provisionalOpe) {
      this.setState({ provisionalNum: updatedProvisionalNum });
    } else {
      this.setState({
        opes: enqueuedOpes,
        provisionalOpe: '',
        provisionalNum: updatedProvisionalNum,
        tmpFormulaHistory: updatedTmpFormulaHistory,
      });
    }
  }

  onPeriod(period: '.') {
    const {
      provisionalNum,
      provisionalOpe,
      opes,
      tmpFormulaHistory
    } = this.state;
    if (provisionalNum.includes('.')) return;

    const enqueuedOpes = enqueue(opes, provisionalOpe);
    const updatedProvisionalNum = provisionalNum === ''
      ? `0${period}`
      : `${provisionalNum}${period}`;
    const updatedTmpFormulaHistory = {
      ...tmpFormulaHistory,
      opes: [...tmpFormulaHistory.opes, enqueuedOpes[1]]
    };

    if (!provisionalOpe) {
      this.setState({ provisionalNum: updatedProvisionalNum });
    } else {
      // 仮の二項演算子が確定する
      this.setState({
        opes: enqueuedOpes,
        provisionalOpe: '',
        provisionalNum: updatedProvisionalNum,
        tmpFormulaHistory: updatedTmpFormulaHistory,
      });
    }
  }

  /**
   * 二項演算子が入力された場合
   */
  onBinaryOpe(inputOpe: Ope) {
    const {
      provisionalNum,
      nums,
      provisionalOpe,
      opes,
      provisionalTmpFormulaNum,
      tmpFormulaHistory,
    } = this.state;
    const inputNum = provisionalNum || nums[1] || '0';
    const enqueuedNums = enqueue(nums, inputNum);

    if (provisionalOpe) {
      // 仮の二項演算子を上書きする
      return this.setState({ provisionalOpe: inputOpe });
    } else {
      // 仮の数字を確定し、仮の二項演算子を設定
      this.setState({
        nums: enqueuedNums,
        provisionalNum: '',
        provisionalOpe: inputOpe,
        provisionalTmpFormulaNum: '',
        tmpFormulaHistory: {
          ...tmpFormulaHistory,
          nums: [...tmpFormulaHistory.nums, provisionalTmpFormulaNum || inputNum],
        },
      });
    }
    // @todo
    if (opes[1] !== '' && isCalculatable(enqueuedNums, opes[1])) {
      this.calc(enqueuedNums, opes[1])
    };
  }

  /**
   * 単項演算子が入力された場合
   */
  onUnaryOpe(type: 'percent' | 'root' | 'square' | 'reciprocal' | 'negate') {
    const handlers: { [k: string]: Handler } = {
      percent ({ value }) {
        const answer = String(value / 100);
        return {
          formula: answer,
          value: answer
        };
      },
      root ({ formula, value }) {
        return {
          formula: `√(${formula})`,
          value: String(Math.sqrt(value))
        };
      },
      square ({ formula, value }) {
        return {
          formula: `sqr(${formula})`,
          value: String(Math.pow(value, 2))
        };
      },
      reciprocal ({ formula, value }) {
        return {
          formula: `1/(${formula})`,
          value: value !== 0 ? String(1 / value) : 'NaN'
        };
      },
      negate ({ formula, value }) {
        return {
          formula: `negate(${formula})`,
          value: String(value * -1)
        };
      }
    };
    const {
      provisionalNum,
      nums,
      provisionalTmpFormulaNum,
    } = this.state;
    // 入力中の値か、なければ前回の答えを計算して入力値を更新
    const inputNum = provisionalNum || nums[1] || '0';
    const answer = handlers[type]({
      // @todo
      formula: provisionalTmpFormulaNum || inputNum,
      value: parseFloat(inputNum),
    });

    this.setState(() => ({
      provisionalNum: answer.value,
      provisionalTmpFormulaNum: answer.formula,
    }));
  }

  onEqu () {
    const {
      provisionalNum,
      nums,
      provisionalOpe,
      opes,
    } = this.state;
    if (!nums[1]) return;

    // 仮の数字がない場合、仮の二項演算子がある場合は前回の答え (現在表示されている数値) を採用
    const enqueuedNum = provisionalNum || nums[provisionalOpe ? 1 : 0];
    const enqueuedNums = enqueue(nums, enqueuedNum);
    if (opes[1]) {
      this.setState({
        nums: enqueuedNums,
        provisionalOpe: '',
        provisionalTmpFormulaNum: '',
        tmpFormulaHistory: {
          nums: [],
          opes: [],
        },
      });
      this.calc(enqueuedNums, opes[1]);
    } else {
      // 仮の二項演算子がない場合 (答えが出た後 onEqu が呼ばれた場合) は前回の入力値を採用
      const enqueuedOpes = enqueue(opes, provisionalOpe || opes[0]);
      this.setState({
        nums: enqueuedNums,
        opes: enqueuedOpes,
        provisionalOpe: '',
        provisionalTmpFormulaNum: '',
        tmpFormulaHistory: {
          nums: [],
          opes: [],
        },
      });
      if (enqueuedOpes[1] !== '') {
        this.calc(enqueuedNums, enqueuedOpes[1]);
      }
    }
  }

  /**
   * すべてリセットする
   */
  onClearAll () {
    const { nums, opes } = this.state;
    const dequeuedNums = dequeue(nums, 2)
    const dequeuedOpes = dequeue(opes, 2)

    this.setState(() => ({
      nums: dequeuedNums,
      opes: dequeuedOpes,
      provisionalNum: '',
      provisionalOpe: '',
      provisionalTmpFormulaNum: '',
      tmpFormulaHistory: {
        nums: [],
        opes: [],
      },
    }));
  }

  /**
   * 入力中の数字をリセットする
   */
  onCancel () {
    this.setState(() => ({
      provisionalNum: '',
      provisionalTmpFormulaNum: '',
    }));
  }

  /**
   * 直近で入力した数字を削除する
   */
  onBackSpace () {
    const { provisionalTmpFormulaNum} = this.state;
    if (provisionalTmpFormulaNum !== '') return;

    this.setState(({ provisionalNum }) => ({
      provisionalNum: provisionalNum.length === 1
        ? '0'
        : provisionalNum.slice(0, -1),
    }));
  }

  calc(nums: [Num | '', Num | ''], ope: Ope) {
    if (!isCalculatable(nums, ope)) {
      return;
    }

    // @todo
    const answer = calc(nums, ope);
    const enqueuedNums = enqueue(nums, answer);
    const { opes } = this.state;
    const dequeuedOpes = dequeue(opes, 1);
    this.setState({
      provisionalNum: '',
      nums: enqueuedNums,
      opes: dequeuedOpes,
    });
  }

  render() {
    return (
      <>
        <div className="box-container">
          <TmpFormulaHistoryBox
            innerWidth={this.state.innerWidth}
            tmpFormulaHistory={this.state.tmpFormulaHistory}
            provisionalOpe={this.state.provisionalOpe}
            provisionalTmpFormulaNum={this.state.provisionalTmpFormulaNum} />

          <AnswerBox
            innerWidth={this.state.innerWidth}
            provisionalNum={this.state.provisionalNum}
            nums={this.state.nums} />
        </div>

        <div className="buttons-container">
          {buttonList.map((button) => (
            <Button
              key={button.name}
              name={button.name}
              handler={this[button.handler]}
              arg={button.arg}
              content={button.content}
              className={button.className}
            />
          ))}
        </div>
      </>
    );
  }
}
