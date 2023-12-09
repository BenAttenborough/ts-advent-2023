import { Utils } from "../helpers/utils.ts";

export const Day09 = {
  partOne: (input: string): number => {
    const result = input
      .split("\n")
      .map((x) => x.split(" ").map(Number))
      .map(findNextNumberInSequence)
      .reduce((cur, next) => cur + next);
    return result;
  },

  partTwo: (input: string): number => {
    const result = input
      .split("\n")
      .map((x) => x.split(" ").map(Number))
      .map((x) => x.reverse())
      .map(findNextNumberInSequence)
      .reduce((cur, next) => cur + next);
    return result;
  },
};

export function differences(arr: number[]): number[] {
  if (arr.length < 2) {
    return [];
  }

  let diffArr: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    diffArr.push(arr[i + 1] - arr[i]);
  }

  return diffArr;
}

export function findNextNumberInSequence(arr: number[]): number {
  if (!arr.length) {
    return -1;
  }
  if (arr.length == 1) {
    return arr[0];
  }
  let adder: number[] = [arr[arr.length - 1]];
  while (arr.length > 0) {
    arr = differences(arr);
    adder.unshift(arr[arr.length - 1]);
    if (Utils.everyValueTheSame(arr)) {
      break;
    }
  }
  return adder.reduce((cur, next) => cur + next, 0);
}
