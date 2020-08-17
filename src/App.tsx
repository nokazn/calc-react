import React, { FC, useState, useEffect, useCallback } from 'react';
import { Button } from './components/Button';
import { TmpFormulaHistoryBox } from './components/TmpFormulaHistoryBox';
import { AnswerBox } from './components/AnswerBox'
import { buttonList } from './data/buttonList';
import { enqueue } from './utils/enqueue';
import { dequeue } from './utils/dequeue';
import { isCalculatable } from './utils/isCalculatable';
import { calc } from './utils/calc';
import './App.css';
import { Num, BinaryOpe, Handler, TwoTupple, UnaryOpe } from './types';

type AppContextMethod = {
  onNum: (input: Num) => void
  onBinaryOpe: (input: BinaryOpe) => void
  onUnaryOpe: (input: UnaryOpe) => void
  onEqu: () => void
  onClearAll: () => void
  onCancel: () => void
  onBackSpace: () => void
}

const initialAppContext: AppContextMethod = {
  onNum: () => {},
  onBinaryOpe: () => {},
  onUnaryOpe: () => {},
  onEqu: () => {},
  onClearAll: () => {},
  onCancel: () => {},
  onBackSpace: () => {},
};

export const AppContext: React.Context<AppContextMethod> = React.createContext(initialAppContext);

export const App: FC = () => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [nums, setNums] = useState<TwoTupple<string>>(['', '']);
  const [opes, setOpes] = useState<TwoTupple<BinaryOpe | ''>>(['', '']);
  const [provisionalNum, setProvisionalNum] = useState<string>('');
  const [provisionalOpe, setProvisionalOpe] = useState<BinaryOpe | ''>('');
  const [provisionalTmpFormulaNum, setProvisionalTmpFormulaNum] = useState('');
  const [tmpFormulaHistory, setTmpFormulaHistory] = useState<{ nums: Array<string>; opes: Array<BinaryOpe | ''> }>({
    nums: [],
    opes: [],
  });

  const calculate = useCallback((nums: TwoTupple<string>, ope: BinaryOpe): void => {
    if (!isCalculatable(nums, ope)) return;

    // @todo
    const answer = calc(nums, ope);
    const enqueuedNums = enqueue(nums, answer);
    const dequeuedOpes = dequeue(opes, 1);
    setProvisionalNum('');
    setNums(enqueuedNums);
    setOpes(dequeuedOpes);
  }, [opes]);

  const updateProvisionalNum = (prev: string, input: Num): string => {
    if (input === '.') {
      return prev === '' ? '0.' : `${prev}.`
    }
    return prev === '0' ? input : `${prev}${input}`
  };

  /**
   * 数字が入力された場合
   */
  const onNum = useCallback((input: Num): void => {
    // すでに小数点が入力されていて、更に小数点が入力されたら何もしない
    if (input === '.' && provisionalNum.includes('.')) return;

    const enqueuedOpes = enqueue(opes, provisionalOpe);
    const updatedProvisionalNum = updateProvisionalNum(provisionalNum, input);
    const updatedTmpFormulaHistory = {
      ...tmpFormulaHistory,
      opes: [...tmpFormulaHistory.opes, enqueuedOpes[1]]
    };

    setProvisionalNum(updatedProvisionalNum);
    // 仮の二項演算子が確定する
    if (provisionalOpe) {
      setOpes(enqueuedOpes);
      setProvisionalOpe('');
      setTmpFormulaHistory(updatedTmpFormulaHistory);
    }
  }, [opes, provisionalNum, provisionalOpe, tmpFormulaHistory]);

  /**
   * 二項演算子が入力された場合
   */
  const onBinaryOpe = useCallback((input: BinaryOpe): void => {
    const inputNum = provisionalNum || nums[1] || '0';
    const enqueuedNums = enqueue(nums, inputNum);

    // 仮の二項演算子があっても上書きする
    setProvisionalOpe(input);
    if (!provisionalOpe) {
      // 仮の数字を確定し、仮の二項演算子を設定
      setNums(enqueuedNums);
      setProvisionalNum('');
      setProvisionalTmpFormulaNum('');
      setTmpFormulaHistory({
        ...tmpFormulaHistory,
        nums: [...tmpFormulaHistory.nums, provisionalTmpFormulaNum || inputNum],
      })
    }
    // @todo
    if (opes[1] !== '' && isCalculatable(enqueuedNums, opes[1])) {
      calculate(enqueuedNums, opes[1])
    };
  }, [calculate, nums, opes, provisionalNum, provisionalOpe, provisionalTmpFormulaNum, tmpFormulaHistory]);

  /**
   * 単項演算子が入力された場合
   */
  const onUnaryOpe = (type: UnaryOpe): void => {
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
    // 入力中の値か、なければ前回の答えを計算して入力値を更新
    const inputNum = provisionalNum || nums[1] || '0';
    const answer = handlers[type]({
      // @todo
      formula: provisionalTmpFormulaNum || inputNum,
      value: parseFloat(inputNum),
    });

    setProvisionalNum(answer.value);
    setProvisionalTmpFormulaNum(answer.formula);
  };

  const onEqu = useCallback((): void => {
    if (!nums[1]) return;

    // 仮の数字がない場合、仮の二項演算子がある場合は前回の答え (現在表示されている数値) を採用
    const enqueuedNum = provisionalNum || nums[provisionalOpe ? 1 : 0];
    const enqueuedNums = enqueue(nums, enqueuedNum);
    setNums(enqueuedNums);
    setProvisionalOpe('');
    setProvisionalTmpFormulaNum('');
    setTmpFormulaHistory({
      nums: [],
      opes: [],
    });

    if (opes[1]) {
      calculate(enqueuedNums, opes[1]);
    } else {
      // 仮の二項演算子がない場合 (答えが出た後 onEqu が呼ばれた場合) は前回の入力値を採用
      const enqueuedOpes = enqueue(opes, provisionalOpe || opes[0]);
      setOpes(enqueuedOpes);
      if (enqueuedOpes[1] !== '') {
        calculate(enqueuedNums, enqueuedOpes[1]);
      }
    }
  }, [calculate, nums, opes, provisionalNum, provisionalOpe]);

  /**
   * すべてリセットする
   */
  const onClearAll = useCallback((): void => {
    const dequeuedNums = dequeue(nums, 2)
    const dequeuedOpes = dequeue(opes, 2)

    setNums(dequeuedNums);
    setOpes(dequeuedOpes);
    setProvisionalNum('');
    setProvisionalOpe('');
    setProvisionalTmpFormulaNum('');
    setTmpFormulaHistory({
      nums: [],
      opes: [],
    });
  }, [nums, opes]);

  /**
   * 入力中の数字をリセットする
   */
  const onCancel = (): void => {
    setProvisionalNum('');
    setProvisionalTmpFormulaNum('');
  };

  /**
   * 直近で入力した数字を削除する
   */
  const onBackSpace = useCallback((): void => {
    if (provisionalTmpFormulaNum !== '') return;

    const updatedProvisionalNum = provisionalNum.length === 1
    ? '0'
    : provisionalNum.slice(0, -1);
    setProvisionalNum(updatedProvisionalNum);
  }, [provisionalNum, provisionalTmpFormulaNum]);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    const eventListener = (e: KeyboardEvent) => {
      if (/^[0-9]$|\./.test(e.key)) {
        onNum(e.key as Num);
      } else if (/^\+|-|\*|\/$/.test(e.key)) {
        onBinaryOpe(e.key as BinaryOpe);
      } else if (e.key === 'Escape') {
        onClearAll();
      } else if (e.key === 'Delete') {
        onCancel();
      } else if (e.key === 'Backspace') {
        onBackSpace();
      } else if (e.key === 'Enter' || e.key === '=') {
        onEqu();
      }
    };
    document.addEventListener('keydown', eventListener);

    return () => {
      document.removeEventListener('keydown', eventListener);
    }
  }, [onBackSpace, onBinaryOpe, onClearAll, onEqu, onNum]);

  return (
    <>
      <AppContext.Provider value={{
        onNum,
        onBinaryOpe,
        onUnaryOpe,
        onEqu,
        onClearAll,
        onCancel,
        onBackSpace,
      }}>
        <div className="box-container">
          <TmpFormulaHistoryBox
            innerWidth={innerWidth}
            tmpFormulaHistory={tmpFormulaHistory}
            provisionalOpe={provisionalOpe}
            provisionalTmpFormulaNum={provisionalTmpFormulaNum} />

          <AnswerBox
            innerWidth={innerWidth}
            provisionalNum={provisionalNum}
            nums={nums} />
        </div>

        <div className="buttons-container">
          {buttonList.map((button) => (
            <Button
              key={button.name}
              name={button.name}
              mathContent={button.mathContent}
              className={button.className}
            />
          ))}
        </div>
      </AppContext.Provider>
    </>
  );
};
