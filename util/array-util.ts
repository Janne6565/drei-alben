export function pickRandom<T>(arr: T[]) {
  if (arr.length === 0) {
    return null;
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getUniqueElements<T>(
  arr: T[],
  getKey: (val: T) => number | string
) {
  const map: Record<number | string, { item: T; count: number }> = {};
  arr.forEach((item) => {
    if (map[getKey(item)]) {
      map[getKey(item)] = { item, count: map[getKey(item)].count + 1 };
    } else {
      map[getKey(item)] = { item, count: 1 };
    }
  });
  return Object.values(map);
}

export function convertValidityMapToArray(vals: Record<string, boolean>) {
  return Object.entries(vals)
    .filter((entry) => entry[1])
    .map((entry) => entry[0]);
}

export function convertArrayToValidityMap(vals: string[]) {
  return Object.fromEntries(vals.map((opt) => [opt, true]) ?? []);
}
