/**
 *
 * @param str
 * @returns the string without special characters and without whitespace, ex: "Al Quway'iyah" will be "AlQuwayiyah"
 */
export function onlyLetters(str: string): string {
  return str.replace(/[^A-Z]+/gi, '');
}
