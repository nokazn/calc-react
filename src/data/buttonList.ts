type ButtonItem = {
  name: string
  mathContent: string
  className: string
  handler: 'onUnaryOpe' | 'onClearAll' | 'onCancel' | 'onBackSpace' | 'onBinaryOpe' | 'onNum' | 'onPeriod' | 'onEqu'
}


export const buttonList: ButtonItem[] =  [
  {
    name: 'percent',
    mathContent: '％',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
  },
  {
    name: 'root',
    mathContent: 'sqrt{x}',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
  },
  {
    name: 'square',
    mathContent: 'x^{2}',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
  },
  {
    name: 'reciprocal',
    mathContent: 'frac{1}{x}',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
  },
  {
    name: 'clearAll',
    mathContent: 'AC',
    className: 'unary-ope-button',
    handler: 'onClearAll',
  },
  {
    name: 'cancel',
    mathContent: 'C',
    className: 'unary-ope-button',
    handler: 'onCancel',
  },
  {
    name: 'clear',
    mathContent: '←',
    className: 'unary-ope-button',
    handler: 'onBackSpace',
  },
  {
    name: '/',
    mathContent: 'div',
    className: 'binary-ope-button',
    handler: 'onBinaryOpe',
  },
  {
    name: '7',
    mathContent: '7',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '8',
    mathContent: '8',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '9',
    mathContent: '9',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '*',
    mathContent: 'times',
    className: 'binary-ope-button',
    handler: 'onBinaryOpe',
  },
  {
    name: '4',
    mathContent: '4',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '5',
    mathContent: '5',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '6',
    mathContent: '6',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '-',
    mathContent: '-',
    className: 'binary-ope-button',
    handler: 'onBinaryOpe',
  },
  {
    name: '1',
    mathContent: '1',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '2',
    mathContent: '2',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '3',
    mathContent: '3',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '+',
    mathContent: '+',
    className: 'binary-ope-button',
    handler: 'onBinaryOpe',
  },
  {
    name: 'negate',
    mathContent: 'pm',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
  },
  {
    name: '0',
    mathContent: '0',
    className: 'num-button',
    handler: 'onNum',
  },
  {
    name: '.',
    mathContent: '.',
    className: 'unary-ope-button',
    handler: 'onPeriod',
  },
  {
    name: '=',
    mathContent: '=',
    className: 'binary-ope-button',
    handler: 'onEqu',
  },
];
