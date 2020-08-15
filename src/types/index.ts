export type Num = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '.';

export type Ope = '+' | '-' | '*' | '/';

export type Handler = (params: {
  value: number
  formula: string
}) => {
  formula: string
  value: string
}
