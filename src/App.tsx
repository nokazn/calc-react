import React, { useState, useEffect, useCallback } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import { Wrapper } from './components/wrapper/Wrapper.style';
import { ButtonWrapper } from './components/wrapper/ButtonWrapper.style';
import { BoxWrapper } from './components/wrapper/BoxWrapper.style';
import { TmpFormulaHistoryBox } from './components/box/TmpFormulaHistoryBox';
import { AnswerBox } from './components//box/AnswerBox';
import { buttonList } from './data/buttonList';
import { enqueue, dequeue, isCalculatable, calc } from './utils';
import './App.css';
import type { BinaryOpe, TwoTupple } from './types';

type Props = {
  className?: string;
};

type AppContextMethod = {
  innerWidth: number;
  nums: TwoTupple<string>;
  opes: TwoTupple<BinaryOpe | ''>;
  provisionalNum: string;
  provisionalOpe: BinaryOpe | '';
  provisionalTmpFormulaNum: string;
  tmpFormulaHistory: {
    nums: string[];
    opes: (BinaryOpe | '')[];
  };
  setInnerWidth: Dispatch<SetStateAction<number>>;
  setNums: Dispatch<SetStateAction<TwoTupple<string>>>;
  setOpes: Dispatch<SetStateAction<TwoTupple<BinaryOpe | ''>>>;
  setProvisionalNum: Dispatch<SetStateAction<string>>;
  setProvisionalOpe: Dispatch<SetStateAction<BinaryOpe | ''>>;
  setProvisionalTmpFormulaNum: Dispatch<SetStateAction<string>>;
  setTmpFormulaHistory: Dispatch<
    SetStateAction<{
      nums: string[];
      opes: (BinaryOpe | '')[];
    }>
  >;
  calculate: (nums: TwoTupple<string>, ope: BinaryOpe) => void;
};

const initialAppContext: AppContextMethod = {
  innerWidth: 0,
  nums: ['', ''],
  opes: ['', ''],
  provisionalNum: '',
  provisionalOpe: '',
  provisionalTmpFormulaNum: '',
  tmpFormulaHistory: {
    nums: [],
    opes: [],
  },
  setInnerWidth: () => {},
  setNums: () => {},
  setOpes: () => {},
  setProvisionalNum: () => {},
  setProvisionalOpe: () => {},
  setProvisionalTmpFormulaNum: () => {},
  setTmpFormulaHistory: () => {},
  calculate: () => {},
};

export const AppContext: React.Context<AppContextMethod> = React.createContext(initialAppContext);

export const App: FC<Props> = ({ className }) => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [nums, setNums] = useState<TwoTupple<string>>(['', '']);
  const [opes, setOpes] = useState<TwoTupple<BinaryOpe | ''>>(['', '']);
  const [provisionalNum, setProvisionalNum] = useState<string>('');
  const [provisionalOpe, setProvisionalOpe] = useState<BinaryOpe | ''>('');
  const [provisionalTmpFormulaNum, setProvisionalTmpFormulaNum] = useState('');
  const [tmpFormulaHistory, setTmpFormulaHistory] = useState<{
    nums: Array<string>;
    opes: Array<BinaryOpe | ''>;
  }>({
    nums: [],
    opes: [],
  });

  const calculate = useCallback(
    (nums: TwoTupple<string>, ope: BinaryOpe): void => {
      if (!isCalculatable(nums, ope)) return;

      // @todo
      const answer = calc(nums, ope);
      const enqueuedNums = enqueue(nums, answer);
      const dequeuedOpes = dequeue(opes, 1);
      setProvisionalNum('');
      setNums(enqueuedNums);
      setOpes(dequeuedOpes);
    },
    [opes],
  );

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          innerWidth,
          nums,
          opes,
          provisionalNum,
          provisionalOpe,
          provisionalTmpFormulaNum,
          tmpFormulaHistory,
          setInnerWidth,
          setNums,
          setOpes,
          setProvisionalNum,
          setProvisionalOpe,
          setProvisionalTmpFormulaNum,
          setTmpFormulaHistory,
          calculate,
        }}
      >
        <Wrapper className={className}>
          <BoxWrapper>
            <TmpFormulaHistoryBox
              innerWidth={innerWidth}
              tmpFormulaHistory={tmpFormulaHistory}
              provisionalOpe={provisionalOpe}
              provisionalTmpFormulaNum={provisionalTmpFormulaNum}
            />

            <AnswerBox innerWidth={innerWidth} provisionalNum={provisionalNum} nums={nums} />
          </BoxWrapper>

          <ButtonWrapper>
            {buttonList.map((button) => (
              <button.component
                key={button.name}
                name={button.name}
                mathContent={button.mathContent}
              />
            ))}
          </ButtonWrapper>
        </Wrapper>
      </AppContext.Provider>
    </>
  );
};
