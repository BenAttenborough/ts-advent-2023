import * as IO from "../helpers/io.ts";
import {
  Day07,
  getInfoOnHands,
  evaluateCards,
  convertCardCharPart1,
  findFirstDifference,
  sortCardsInSameRank,
  convertJacks,
} from "./main.ts";

let inputTest: IO.result = {
  isSuccess: false,
  value: "",
  error: null,
};

let inputReal: IO.result = {
  isSuccess: false,
  value: "",
  error: null,
};

beforeAll(async () => {
  try {
    let temp: string = await IO.getInput(__dirname, "input_test.txt");
    inputTest = IO.success(temp);
  } catch (err) {
    inputTest = IO.failure(err);
  }

  try {
    let temp: string = await IO.getInput(__dirname, "input.txt");
    inputReal = IO.success(temp);
  } catch (err) {
    inputReal = IO.failure(err);
  }
});

test("07-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day07.partOne(inputTest.value)).toBe(6440);
  } else {
    console.error(inputTest.error);
  }
});

// test("07-1-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day07.partOne(inputReal.value)).toBe(253313241);
//   } else {
//     console.error(inputReal.error);
//   }
// });

test("07-getInfoOnHands", () => {
  expect(getInfoOnHands([13, 13, 6, 7, 7])).toStrictEqual([
    {
      cardType: 13,
      amount: 2,
    },
    {
      cardType: 6,
      amount: 1,
    },
    {
      cardType: 7,
      amount: 2,
    },
  ]);
});

test("07-convertCardChar", () => {
  expect(convertCardCharPart1("2")).toBe(2);
  expect(convertCardCharPart1("5")).toBe(5);
  expect(convertCardCharPart1("9")).toBe(9);
  expect(convertCardCharPart1("T")).toBe(10);
  expect(convertCardCharPart1("J")).toBe(11);
  expect(convertCardCharPart1("Q")).toBe(12);
  expect(convertCardCharPart1("K")).toBe(13);
  expect(convertCardCharPart1("A")).toBe(14);
});

test("07-findFirstDifference", () => {
  expect(findFirstDifference([1, 1, 1, 1], [1, 1, 2, 1])).toBe(2);
  expect(findFirstDifference([1, 1, 1, 1], [1, 1, 1, 1])).toBe(-1);
});

test("07-sortCardsInSameRank", () => {
  expect(
    sortCardsInSameRank([
      [2, 1, 1, 1],
      [1, 1, 2, 1],
    ]),
  ).toStrictEqual([
    [1, 1, 2, 1],
    [2, 1, 1, 1],
  ]);
  expect(
    sortCardsInSameRank([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ]),
  ).toStrictEqual([
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ]);
  expect(
    sortCardsInSameRank([
      [1, 1, 1, 4],
      [1, 1, 1, 1],
      [1, 1, 1, 3],
      [1, 1, 1, 5],
      [1, 1, 1, 3],
    ]),
  ).toStrictEqual([
    [1, 1, 1, 1],
    [1, 1, 1, 3],
    [1, 1, 1, 3],
    [1, 1, 1, 4],
    [1, 1, 1, 5],
  ]);
});

test("07-getInfoOnHands", () => {
  expect(evaluateCards([3, 2, 10, 3, 13])).toBe("ONE_PAIR");
  expect(evaluateCards([10, 5, 5, 11, 5])).toBe("THREE_OAK");
  expect(evaluateCards([13, 13, 6, 7, 7])).toBe("TWO_PAIR");
  expect(evaluateCards([13, 10, 11, 11, 10])).toBe("TWO_PAIR");
  expect(evaluateCards([12, 12, 12, 11, 14])).toBe("THREE_OAK");
});

test("07-convertJacks", () => {
  expect(convertJacks([3, 1, 1, 3, 13].sort())).toStrictEqual(
    [3, 3, 3, 3, 13].sort(),
  );
});

test("07-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day07.partTwo(inputTest.value)).toBe(5905);
  } else {
    console.error(inputTest.error);
  }
});

test("07-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day07.partTwo(inputReal.value)).toBe(253362743);
  } else {
    console.error(inputReal.error);
  }
});
