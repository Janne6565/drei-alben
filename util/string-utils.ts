export function toUppercase(input: string) {
  return input[0].toUpperCase() + input.slice(1);
}

export function shortenString(
  input: string,
  length: number,
  endDecorator?: string
) {
  if (input.length < length) {
    return input;
  }
  return input.slice(0, length) + (endDecorator ? endDecorator : "...");
}
