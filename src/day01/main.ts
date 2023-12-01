export const Day01 = {
  partOne: (input: string): number => {
    const result = input
      .split("\n")
      .map((x) =>
        x
          .split("")
          .map(Number)
          .filter((a) => !isNaN(a)),
      )
      .map((x) => x[0] * 10 + x[x.length - 1])
      .reduce((prev, next) => {
        return prev + next;
      }, 0);
    return result;
  },

  partTwo: (input: string): number => {
    const result = input
      .split("\n")
      .map((x) => x.trim())
      .map(firstAndLast)
      .map((x) => x[0] * 10 + x[x.length - 1])
      .reduce((prev, next) => {
        return prev + next;
      }, 0);
    return result;
  },
};

type firstAndLastNumbers = [number, number];

function firstAndLast(line: String): firstAndLastNumbers {
  const numbers = new Map([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
  ]);
  let earliestNumberIndex = line.length;
  let earliestNumber = -1;
  let lastNumberIndex = -1;
  let lastNumber = -1;
  numbers.forEach((value, key) => {
    let firstIndexOfNumber = line.indexOf(key);
    let lastIndexOfNumber = line.lastIndexOf(key);

    if (firstIndexOfNumber >= 0 && firstIndexOfNumber < earliestNumberIndex) {
      earliestNumberIndex = firstIndexOfNumber;
      earliestNumber = value;
    }
    if (lastIndexOfNumber >= 0 && lastIndexOfNumber > lastNumberIndex) {
      lastNumberIndex = lastIndexOfNumber;
      lastNumber = value;
    }
  });
  return [earliestNumber, lastNumber];
}
