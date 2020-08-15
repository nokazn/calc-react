export const dequeue = <T extends unknown[]>(
  list: T,
  count: number = 1,
  initalValue: any = '',
): T  => {
  if (count < 0) {
    throw new RangeError('Invalid dequeue count');
  }

  list.splice(0, count);
  return [
    ...list,
    ...new Array(count).fill(initalValue),
  ] as T;
};
