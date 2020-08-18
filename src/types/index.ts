export type Num = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '.';
export type BinaryOpe = '+' | '-' | '*' | '/';
export type UnaryOpe = 'percent' | 'root' | 'square' | 'reciprocal' | 'negate';

export type TwoTupple<T> = [T, T];

export type Handler = (params: {
  value: number;
  formula: string;
}) => {
  formula: string;
  value: string;
};
