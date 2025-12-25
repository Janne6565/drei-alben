export function formatDate(unixTimestamp: number) {
  return new Date(unixTimestamp).toLocaleDateString();
}
