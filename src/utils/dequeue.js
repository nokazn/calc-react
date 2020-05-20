export const dequeue = (list, count = 1) => {
  if (typeof count !== 'number') {
    throw new SyntaxError('Invalid or unexpected token');
  } else if (count < 0) {
    throw new RangeError('Invalid dequeue count');
  }
  list.splice(0, count)
  return [
    ...list,
    ...new Array(count).fill(''),
  ];
}