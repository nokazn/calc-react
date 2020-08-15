type ButtonItem = {
  name: string
  content: string
  className: string
  handler: 'onUnaryOpe' | 'onClearAll' | 'onCancel' | 'onBackSpace' | 'onBinaryOpe' | 'onNum' | 'onPeriod' | 'onEqu'
  arg: string | undefined
}


export const buttonList: ButtonItem[] =  [
  {
    name: 'percent',
    content: '％',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
    arg: 'percent'
  },
  {
    name: 'root',
    content: 'sqrt{x}',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
    arg: 'root'
  },
  {
    name: 'square',
    content: 'x^{2}',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
    arg: 'square'
  },
  {
    name: 'reciprocal',
    content: 'frac{1}{x}',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
    arg: 'reciprocal'
  },
  {
    name: 'clearAll',
    content: 'AC',
    className: 'unary-ope-button',
    handler: 'onClearAll',
    arg: undefined
  },
  {
    name: 'cancel',
    content: 'C',
    className: 'unary-ope-button',
    handler: 'onCancel',
    arg: undefined
  },
  {
    name: 'clear',
    content: '←',
    className: 'unary-ope-button',
    handler: 'onBackSpace',
    arg: undefined
  },
  {
    name: 'divide',
    content: 'div',
    className: 'binary-ope-button',
    handler: 'onBinaryOpe',
    arg: '/'
  },
  {
    name: '7',
    content: '7',
    className: 'num-button',
    handler: 'onNum',
    arg: '7'
  },
  {
    name: '8',
    content: '8',
    className: 'num-button',
    handler: 'onNum',
    arg: '8'
  },
  {
    name: '9',
    content: '9',
    className: 'num-button',
    handler: 'onNum',
    arg: '9'
  },
  {
    name: 'multiple',
    content: 'times',
    className: 'binary-ope-button',
    handler: 'onBinaryOpe',
    arg: '*'
  },
  {
    name: '4',
    content: '4',
    className: 'num-button',
    handler: 'onNum',
    arg: '4'
  },
  {
    name: '5',
    content: '5',
    className: 'num-button',
    handler: 'onNum',
    arg: '5'
  },
  {
    name: '6',
    content: '6',
    className: 'num-button',
    handler: 'onNum',
    arg: '6'
  },
  {
    name: 'subtract',
    content: '-',
    className: 'binary-ope-button',
    handler: 'onBinaryOpe',
    arg: '-'
  },
  {
    name: '1',
    content: '1',
    className: 'num-button',
    handler: 'onNum',
    arg: '1'
  },
  {
    name: '2',
    content: '2',
    className: 'num-button',
    handler: 'onNum',
    arg: '2'
  },
  {
    name: '3',
    content: '3',
    className: 'num-button',
    handler: 'onNum',
    arg: '3'
  },
  {
    name: 'add',
    content: '+',
    className: 'binary-ope-button',
    handler: 'onBinaryOpe',
    arg: '+'
  },
  {
    name: 'negate',
    content: 'pm',
    className: 'unary-ope-button',
    handler: 'onUnaryOpe',
    arg: 'negate'
  },
  {
    name: '0',
    content: '0',
    className: 'num-button',
    handler: 'onNum',
    arg: '0'
  },
  {
    name: '.',
    content: '.',
    className: 'unary-ope-button',
    handler: 'onPeriod',
    arg: '.'
  },
  {
    name: '=',
    content: '=',
    className: 'binary-ope-button',
    handler: 'onEqu',
    arg: ''
  },
];
