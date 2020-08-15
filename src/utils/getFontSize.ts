export const getFontSize = (element: HTMLElement): number => {
  const fontSize = document.defaultView.getComputedStyle(element).fontSize;
  return parseFloat(fontSize.replace('px', ''));
};
