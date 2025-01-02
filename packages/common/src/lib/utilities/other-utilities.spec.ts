import { uniqWith, isEqual, uniq, isEmpty, groupBy } from './other-utilities';

describe('uniqWith', () => {
  it('should remove duplicate objects based on comparison function', () => {
    const arr = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John' },
    ];
    const result = uniqWith(arr, (a, b) => a.id === b.id);
    expect(result).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  });

  it('should return an empty array when input is empty', () => {
    const arr: unknown[] = [];
    const result = uniqWith(arr, (a, b) => a === b);
    expect(result).toEqual([]);
  });

  it('should handle arrays with primitive values', () => {
    const arr = [1, 2, 2, 3, 1];
    const result = uniqWith(arr, (a, b) => a === b);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe('isEqual', () => {
  test('compares primitive values', () => {
    expect(isEqual(42, 42)).toBe(true);
    expect(isEqual(42, '42')).toBe(false);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  test('compares null and undefined', () => {
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual(undefined, {})).toBe(false);
  });

  test('compares arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(isEqual([1, [2, 3]], [1, [3, 2]])).toBe(false);
    expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
  });

  test('compares objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
    expect(isEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
    expect(isEqual({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false);
  });

  test('compares arrays and objects together', () => {
    expect(isEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 })).toBe(false);
    expect(isEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
    expect(isEqual([{ a: 1 }], [{ a: 2 }])).toBe(false);
  });

  test('handles type mismatches', () => {
    expect(isEqual(42, { number: 42 })).toBe(false);
    expect(isEqual('hello', ['hello'])).toBe(false);
    expect(isEqual(null, [])).toBe(false);
  });

  test('compares nested structures', () => {
    const obj1 = { a: 1, b: { c: { d: 2 } } };
    const obj2 = { a: 1, b: { c: { d: 2 } } };
    const obj3 = { a: 1, b: { c: { d: 3 } } };

    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
  });

  test('compares reference equality', () => {
    const obj = { a: 1 };
    expect(isEqual(obj, obj)).toBe(true); // Same reference
    expect(isEqual(obj, { a: 1 })).toBe(true); // Different reference, same content
  });

  test('compares mixed structures', () => {
    const arr1 = [1, { a: [2, 3] }];
    const arr2 = [1, { a: [2, 3] }];
    const arr3 = [1, { a: [3, 2] }];

    expect(isEqual(arr1, arr2)).toBe(true);
    expect(isEqual(arr1, arr3)).toBe(false);
  });

  it('should return true for equal primitive values', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('test', 'test')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('test', 'Test')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
  });

  it('should return true for equal arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([], [])).toBe(true);
  });

  it('should return false for different arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('should return true for equal objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({}, {})).toBe(true);
  });

  it('should return false for different objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('should return false for objects with different keys', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
  });

  it('should return true for null values', () => {
    expect(isEqual(null, null)).toBe(true);
  });

  it('should return false for null vs non-null values', () => {
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual({}, null)).toBe(false);
  });
});

describe('uniq', () => {
  it('should remove duplicate primitive values', () => {
    const arr = [1, 2, 2, 3, 1];
    const result = uniq(arr);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle an array with no duplicates', () => {
    const arr = [1, 2, 3];
    const result = uniq(arr);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should return an empty array when input is empty', () => {
    const arr: unknown[] = [];
    const result = uniq(arr);
    expect(result).toEqual([]);
  });

  it('should handle arrays with different types of values', () => {
    const arr = [1, '1', 2, '2', 1, '1'];
    const result = uniq(arr);
    expect(result).toEqual([1, '1', 2, '2']);
  });

  it('should handle arrays with objects', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
    const result = uniq(arr);
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 1 }]);
  });
});

describe('isEmpty', () => {
  it('should return true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for empty strings', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should return true for empty arrays', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return true for empty objects', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should return false for non-empty strings', () => {
    expect(isEmpty('test')).toBe(false);
  });

  it('should return false for non-empty arrays', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('should return false for non-empty objects', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('should return false for numbers and booleans', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(1)).toBe(false);
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });
});

describe('groupBy', () => {
  it('should group objects by a key', () => {
    const arr = [
      { id: 1, category: 'A' },
      { id: 2, category: 'B' },
      { id: 3, category: 'A' },
    ];
    const result = groupBy(arr, 'category');
    expect(result).toEqual({
      A: [
        { id: 1, category: 'A' },
        { id: 3, category: 'A' },
      ],
      B: [{ id: 2, category: 'B' }],
    });
  });

  it('should group objects by a function', () => {
    const arr = [
      { id: 1, category: 'A' },
      { id: 2, category: 'B' },
      { id: 3, category: 'A' },
    ];
    const result = groupBy(arr, (item) => item.category);
    expect(result).toEqual({
      A: [
        { id: 1, category: 'A' },
        { id: 3, category: 'A' },
      ],
      B: [{ id: 2, category: 'B' }],
    });
  });

  it('should handle an empty array', () => {
    const arr: [] = [];
    const result = groupBy(arr, 'category');
    expect(result).toEqual({});
  });

  it('should handle arrays with primitive values', () => {
    const arr = [1, 2, 2, 3, 1];
    const result = groupBy(arr, String);
    expect(result).toEqual({
      '1': [1, 1],
      '2': [2, 2],
      '3': [3],
    });
  });
});
