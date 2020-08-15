export const getFontSize = (element: HTMLElement | null): number => {
  if (element == null) return 0;

  const fontSize = document.defaultView?.getComputedStyle(element).fontSize;
  return parseFloat(fontSize?.replace('px', '') ?? '0');
};
