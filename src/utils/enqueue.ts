export const enqueue = <T extends U[], U extends any>(
  list: T,
  val: U,
): T => {
  const { length } = list;
  if (list[length - 1] == null || list[length - 1] === '') {
    list[length - 1] = val;
    return list;
  }

  return [
    ...list.slice(1, length),
    val,
  ] as T;
}