/**
 * @param {Element} element 
 * @return {number}
 */
export const getFontSize = (element) => {
  const fontSize = document.defaultView.getComputedStyle(element).fontSize;
  return parseFloat(fontSize.replace('px', ''));
}