export interface Map<T> {
  [key: string]: T;
}

export function defaultArray<T>(array: readonly T[]): T[] {
  if (typeof array === 'undefined' || array === null) {
    return [];
  } else {
    return array.map(i=>i);
  }
}
