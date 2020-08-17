import { FC } from 'react';

import { NumberButton } from '../components/NumberButton'
import { BinaryOpeButton } from '../components/BinaryOpeButton'
import { UnaryOpeButton } from '../components/UnaryOpeButton'
import { ClearAllButton } from '../components/ClearAllButton'
import { CancelButton } from '../components/CancelButton'
import { BackSpaceButton } from '../components/BackSpaceButton'
import { EqualButton } from '../components/EqualButton'

type Props = {
  name: string
  mathContent: string
}

type ButtonItem = {
  name: string
  mathContent: string
  component: FC<Props>
}


export const buttonList: ButtonItem[] =  [
  {
    name: 'percent',
    mathContent: '％',
    component: UnaryOpeButton,
  },
  {
    name: 'root',
    mathContent: 'sqrt{x}',
    component: UnaryOpeButton,
  },
  {
    name: 'square',
    mathContent: 'x^{2}',
    component: UnaryOpeButton,
  },
  {
    name: 'reciprocal',
    mathContent: 'frac{1}{x}',
    component: UnaryOpeButton,
  },
  {
    name: 'clearAll',
    mathContent: 'AC',
    component: ClearAllButton,
  },
  {
    name: 'cancel',
    mathContent: 'C',
    component: CancelButton,
  },
  {
    name: 'clear',
    mathContent: '←',
    component: BackSpaceButton,
  },
  {
    name: '/',
    mathContent: 'div',
    component: BinaryOpeButton,
  },
  {
    name: '7',
    mathContent: '7',
    component: NumberButton,
  },
  {
    name: '8',
    mathContent: '8',
    component: NumberButton,
  },
  {
    name: '9',
    mathContent: '9',
    component: NumberButton,
  },
  {
    name: '*',
    mathContent: 'times',
    component: BinaryOpeButton,
  },
  {
    name: '4',
    mathContent: '4',
    component: NumberButton,
  },
  {
    name: '5',
    mathContent: '5',
    component: NumberButton,
  },
  {
    name: '6',
    mathContent: '6',
    component: NumberButton,
  },
  {
    name: '-',
    mathContent: '-',
    component: BinaryOpeButton,
  },
  {
    name: '1',
    mathContent: '1',
    component: NumberButton,
  },
  {
    name: '2',
    mathContent: '2',
    component: NumberButton,
  },
  {
    name: '3',
    mathContent: '3',
    component: NumberButton,
  },
  {
    name: '+',
    mathContent: '+',
    component: BinaryOpeButton,
  },
  {
    name: 'negate',
    mathContent: 'pm',
    component: UnaryOpeButton,
  },
  {
    name: '0',
    mathContent: '0',
    component: NumberButton,
  },
  {
    name: '.',
    mathContent: '.',
    component: NumberButton,
  },
  {
    name: '=',
    mathContent: '=',
    component: EqualButton,
  },
];
