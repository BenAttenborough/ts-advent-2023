import { Utils } from "../helpers/utils.ts";

export const Day04 = {
  partOne: (input: string): number => {
    const result = input
      .split("\n")
      .map(parseLines)
      .reduce((prev, next) => prev + next, 0);
    // console.log(result);
    return result;
  },
  partTwo: (input: string): number => {
    const masterArray = input.split("\n").map(parseLines2);
    let copy = input.split("\n").map(parseLines2);
    let currentIndex = 0;
    let cardsToAdd: CardAdder = { indexes: [], amountToAdd: 0 };
    let count = 0;
    while (masterArray[currentIndex] !== undefined) {
      let numberOfIndexesToCheck = masterArray[currentIndex].value;
      let startingIdxToCheck = currentIndex + 1;
      let endingIdxToCheck = startingIdxToCheck + numberOfIndexesToCheck - 1;
      cardsToAdd = {
        indexes: Utils.range(startingIdxToCheck, endingIdxToCheck),
        amountToAdd: copy[currentIndex].amount,
      };
      cardsToAdd.indexes.forEach((card) => {
        if (copy[card] !== undefined) {
          count++;
          copy[card].amount += cardsToAdd.amountToAdd;
        }
      });
      cardsToAdd = { indexes: [], amountToAdd: 0 };
      currentIndex++;
    }

    return copy.reduce((prev, next) => {
      return prev + next.amount;
    }, 0);
  },
};

type CardAdder = {
  indexes: number[];
  amountToAdd: number;
};

type Card = {
  value: number;
  amount: number;
};

// function range(start: number, end: number): number[] {
//   let arr: number[] = [];
//   if (start > end) {
//     return [];
//   } else {
//     for (let i = start; i <= end; ++i) {
//       arr.push(i);
//     }
//   }
//   return arr;
// }

function parseLines(line: string): number {
  const separator = line.indexOf(":");
  let result = line
    .slice(separator + 2)
    .split("|")
    .map((x) => x.trim())
    .map((x) => x.split(" "))
    .map((x) => x.filter((y) => y !== ""))
    .map((x) => x.map(Number));

  let winningNumbers = result[0];
  let ourNumbers = result[1];
  let numberOfWinners = 0;
  winningNumbers.forEach((winner) => {
    if (ourNumbers.includes(winner)) {
      if (numberOfWinners === 0) {
        numberOfWinners = 1;
      } else {
        numberOfWinners = numberOfWinners * 2;
      }
    }
  });
  return numberOfWinners;
}

function parseLines2(line: string): Card {
  const separator = line.indexOf(":");
  let result = line
    .slice(separator + 2)
    .split("|")
    .map((x) => x.trim())
    .map((x) => x.split(" "))
    .map((x) => x.filter((y) => y !== ""))
    .map((x) => x.map(Number));

  let winningNumbers = result[0];
  let ourNumbers = result[1];
  let numberOfWinners = 0;
  winningNumbers.forEach((winner) => {
    if (ourNumbers.includes(winner)) {
      numberOfWinners++;
    }
  });

  return {
    value: numberOfWinners,
    amount: 1,
  };
}
