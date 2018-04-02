// @flow

const DEFAULT_MAX_LENGTH = 4;

export function trimString(string: string, maxLength: ?number) {
  return string.slice(0, maxLength || DEFAULT_MAX_LENGTH);
}

// transforms and add padding (empty string) accordingly
export function transformStringToArray(
  string: string = '',
  arraySize: ?number,
) {
  let array = generateArray(arraySize || DEFAULT_MAX_LENGTH);
  string.split('').forEach((letter, index) => {
    array[index] = letter;
  });
  return array;
}

function generateArray(arraySize: number) {
  let array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push('');
  }
  return array;
}
