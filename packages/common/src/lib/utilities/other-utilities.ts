// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_uniqwith
export function uniqWith<T>(arr: T[], fn: (a: T, b: T) => boolean): T[] {
  return arr.filter(
    (element, index) => arr.findIndex((step) => fn(element, step)) === index
  );
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function isEqual(value: unknown, other: unknown): boolean {
  // Primitive comparison
  if (typeof value !== 'object' && typeof other !== 'object') {
    return Object.is(value, other);
  }

  // Null comparison
  if (value === null && other === null) {
    return true;
  }

  // Type mismatch
  if (typeof value !== typeof other) {
    return false;
  }

  // Reference equality
  if (value === other) {
    return true;
  }

  // Array comparison
  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }

    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], other[i])) {
        return false;
      }
    }

    return true;
  }

  // Array vs non-array mismatch
  if (Array.isArray(value) || Array.isArray(other)) {
    return false;
  }

  // Object comparison
  if (
    value !== null &&
    other !== null &&
    typeof value === 'object' &&
    typeof other === 'object'
  ) {
    const valueKeys = Object.keys(value);
    const otherKeys = Object.keys(other);

    if (valueKeys.length !== otherKeys.length) {
      return false;
    }

    for (const key of valueKeys) {
      if (!(key in other)) {
        return false;
      }

      // Use type assertion to safely access properties
      const valueProp = (value as Record<string, unknown>)[key];
      const otherProp = (other as Record<string, unknown>)[key];

      if (!isEqual(valueProp, otherProp)) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return false;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string)
): Record<string, T[]> {
  return arr.reduce(
    (result, item) => {
      const groupKey =
        typeof key === 'function' ? key(item) : String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}
