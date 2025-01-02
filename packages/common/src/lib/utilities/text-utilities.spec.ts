import { onlyLetters } from './text-utilities';

describe('Text Utilities', () => {
  it('onlyLetters should removes spaces and special characters', () => {
    expect(onlyLetters("Al Quway'iyah")).toEqual('AlQuwayiyah');
  });
});
