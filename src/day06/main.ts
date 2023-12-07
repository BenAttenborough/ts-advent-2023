export const Day06 = {
  partOne: (input: string): number => {
    const result = input.split("\n").map((x) => {
      const startIdx = x.indexOf(":");
      const y = x.slice(startIdx + 1);
      return y
        .trim()
        .split(" ")
        .filter((z) => {
          return z !== "";
        })
        .map((x) => Number(x));
    });
    const time = result[0];
    const recordDistance = result[1];
    let numberOfWinningWays: number[] = [];
    for (let i = 0; i < time.length; i++) {
      let distances = distanceOverTime(time[i]);
      numberOfWinningWays.push(numbersAboveValue(distances, recordDistance[i]));
    }
    return multDistances(numberOfWinningWays);
  },

  partTwo: (input: string): number => {
    const result = input
      .split("\n")
      .map((x) => {
        const startIdx = x.indexOf(":");
        const y = x.slice(startIdx + 1);
        return y.split("").filter(isNumber).join("");
      })
      .map(Number);
    let distances = distanceOverTime(result[0]);
    return numbersAboveValue(distances, result[1]);
  },
};

function isNumber(char: string): boolean {
  const reg = new RegExp("^[0-9]$");
  return reg.test(char);
}

export function distanceOverTime(time: number): number[] {
  let distances: number[] = [];
  for (let i = 0; i <= time; i++) {
    distances.push((time - i) * i);
  }
  return distances;
}

export function multDistances(distances: number[]): number {
  return distances.reduce((cur, next) => cur * next, 1);
}

export function numbersAboveValue(numbers: number[], value: number): number {
  return numbers.filter((x) => x > value).length;
}
