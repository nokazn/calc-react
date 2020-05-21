/**
 * @param {string} num 
 * @return {string}
 */
export const addComma = (num) => {
  const replacer = (num) => num
  .replace(/(^-?\d+)(\d{3})($|(?:\.|,\d))/, (match, ...p) => {
      // p[0] = (マイナス? 数字1回以上)
      // p[1] = (数字3回)
      // p[2] = (終端 | (?: 小数点かコンマ 数字1回))
      const answer = `${p[0]},${p[1]}${p[2]}`;
      // マッチするものがある限り再帰的に呼び出す
      return match
        ? replacer(answer)
        : answer;
    });

  return replacer(num);
}