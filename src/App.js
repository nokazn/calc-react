import React from 'react';
import Button from './components/Button';
import buttonList from './data/buttonList';
import { enqueue } from './utils/enqueue';
import { dequeue } from './utils/dequeue';
import { convertToZero } from './utils/convertToZero';
import { addComma } from './utils/addComma';
import { calc } from './utils/calc';
import { OPE_LIST } from './constant';
import './App.css';

const isCalculatable = (nums, ope) => {
  return !Number.isNaN(parseFloat(nums[0]))
    && !Number.isNaN(parseFloat(nums[1]))
    && OPE_LIST.some((availableOpe) => ope === availableOpe);
}



export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerWidth: 0,
      defaultFontSize: {},
      activeButtonName: null,
      nums: ['', ''],
      opes: ['', ''],
      provisionalNum: '',
      provisionalOpe: '',
      tmpFormula: {
        num: '',
        ope: ''
      },
    }

    this.onNum = this.onNum.bind(this);
    this.onBinaryOpe = this.onBinaryOpe.bind(this);
    this.onUnaryOpe = this.onUnaryOpe.bind(this);
    this.onEqu = this.onEqu.bind(this);
    this.onClearAll = this.onClearAll.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onBackSpace = this.onBackSpace.bind(this);
    this.calc = this.calc.bind(this);
  }

  /**
   * 数字が入力された場合
   * @param {string} num - /[0-9]|\./
   */
  onNum(inputNum) {
    const { provisionalNum, provisionalOpe, opes } = this.state;
    const enqueuedOpes = enqueue(opes, provisionalOpe);
    const addedProvisionalNum = provisionalNum === '0'
      ? inputNum
      : provisionalNum + inputNum;

    this.setState(() => {
      if (!provisionalOpe) return { provisionalNum: addedProvisionalNum }

      // 仮の二項演算子が確定する
      return {
        opes: enqueuedOpes,
        provisionalOpe: '',
        provisionalNum: addedProvisionalNum
      };
    })
  }

  /**
   * 二項演算子が入力された場合
   * @param {string} - '+' | '-' | '*' | '/'
   */
  onBinaryOpe(inputOpe) {
    const { provisionalNum, nums, provisionalOpe, opes, tmpFormula } = this.state;
    const inputNum = provisionalNum || nums[1] || '0';
    const enqueuedNums = enqueue(nums, inputNum);

    this.setState(() => {
      // 仮の二項演算子を上書きする
      if (provisionalOpe) return { provisionalOpe: inputOpe }
    
      // 仮の数字を確定し、仮の二項演算子を設定
      return {
        nums: enqueuedNums,
        provisionalNum: '',
        provisionalOpe: inputOpe,
        tmpFormula: {
          num: tmpFormula.num || inputNum,
          ope: inputOpe
        },
      };
    });
    // @todo
    if (isCalculatable(enqueuedNums, opes)) {
      this.calc(enqueuedNums, opes[1])
    };
  }

  /**
   * 単項演算子が入力された場合
   * @param {string} type - 'percent' | 'root' | 'square' | 'reciprocal' | 'negate'
   */
  onUnaryOpe(type) {
    /**
     * @typedef Handler: ({ value: string, formula: number }) => ({
     *  formula: string,
     *  value: string
     * })
     * @type {[key: string]: Handler}
     */
    const handlers = {
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
      // @todo
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
    const { provisionalNum, nums, tmpFormula } = this.state;
    // 入力中の値か、なければ前回の答えを計算して入力値を更新
    const inputNum = provisionalNum || nums[1] || '0';
    const answer = handlers[type]({
      formula: tmpFormula.num || inputNum,
      value: parseFloat(inputNum),
    });

    this.setState(({ tmpFormula }) => ({
      provisionalNum: answer.value,
      tmpFormula: {
        ...tmpFormula,
        num: answer.value,
      },
    }));
  }

  onEqu () {
    const { provisionalNum, nums, provisionalOpe, opes } = this.state;
    if (!nums[1]) return;
    
    // 仮の数字がない場合、仮の二項演算子がある場合は前回の答え (現在表示されている数値) を採用
    const enqueuedNum = provisionalNum || nums[provisionalOpe ? 1 : 0];
    const enqueuedNums = enqueue(nums, enqueuedNum);
    if (opes[1]) {
      this.setState({ nums: enqueuedNums });
      this.calc(enqueuedNums, opes[1]);
    } else {
      const enqueuedOpes = enqueue(opes, provisionalOpe || opes[0]);
      // 仮の二項演算子がない場合 (答えが出た後 onEqu が呼ばれた場合) は前回の入力値を採用
      this.setState({
        nums: enqueuedNums,
        opes: enqueuedOpes,
        ope: '',
      });
      this.calc(enqueuedNums, enqueuedOpes[1]);
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
    }));
  }

  /**
   * 入力中の数字をリセットする
   */
  onCancel () {
    this.setState(({ tmpFormula }) => ({
      provisionalNum: '0',
      tmpFormula: {
        ...tmpFormula,
        num: '',
      },
    }));
  }

  /**
   * 直近で入力した数字を削除する
   */
  onBackSpace () {
    this.setState(({ provisionalNum }) => ({
      provisionalNum: provisionalNum.length === 1
        ? '0' 
        : provisionalNum.slice(0, -1),
    }));
  }

  calc(nums, ope) {
    if (!isCalculatable(nums, ope)) {
      console.error('This formula is uncalcuatable!', { formula: this.formula });
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
    const CalcButton = buttonList.map((button) => (
      <Button
        key={button.name}
        name={button.name}
        handler={this[button.handler]}
        arg={button.arg}
        content={button.content}
        className={button.className}
      />
    ));

    return (
      <>
        <div className="box-container">
          <div
            id="tmpFormulaBox"
            className="box tmp-formula-box">
            <span>{}</span>
          </div>

          <div
            id="answerBox"
            className="box answer-box">
            <span>
              {addComma(convertToZero(
                this.state.provisionalNum || this.state.nums[1]
              ))}
            </span>
          </div>
        </div>

        <div className="buttons-container">
          {CalcButton}
        </div>
      </>
    );
  }
}
