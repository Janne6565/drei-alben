export function pickRandom<T>(arr: T[]) {
  if (arr.length === 0) {
    return null;
  }
  return arr[Math.floor(Math.random() * arr.length)];
}
