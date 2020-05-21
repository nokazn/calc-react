/**
 * @param {any[]} list 
 * @param {any} val 
 */
export const enqueue = (list, val) => {
  const { length } = list;
  if (list[length - 1] === '') {
    list[length - 1] = val;
    return [...list];
  }

  return [
    ...list.slice(1, length),
    val,
  ];
}