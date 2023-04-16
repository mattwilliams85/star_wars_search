export function romanize(num: number): string {
  const romanNumerals: Record<number, string> = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
  };

  let result = '';
  const sortedKeys = Object.keys(romanNumerals)
    .map(Number)
    .sort((a, b) => b - a); // sort keys in descending order

  while (num > 0) {
    for (const key of sortedKeys) {
      if (num >= key) {
        result += romanNumerals[key];
        num -= key;
        break;
      }
    }
  }

  return result;
}