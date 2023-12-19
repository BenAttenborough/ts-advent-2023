import * as IO from "../helpers/io.ts";
import {
  Day07,
  getInfoOnHands,
  evaluateCards,
  convertCardChar,
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
    expect(Day07.partOne(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

// test("07-1-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day07.partOne(inputReal.value)).toBe(0);
//   } else {
//     console.error(inputReal.error);
//   }
// });

test("07-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day07.partTwo(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

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
  expect(convertCardChar("2")).toBe(2);
  expect(convertCardChar("5")).toBe(5);
  expect(convertCardChar("9")).toBe(9);
  expect(convertCardChar("T")).toBe(10);
  expect(convertCardChar("J")).toBe(11);
  expect(convertCardChar("Q")).toBe(12);
  expect(convertCardChar("K")).toBe(13);
  expect(convertCardChar("A")).toBe(14);
});

test("07-getInfoOnHands", () => {
  expect(evaluateCards([3, 2, 10, 3, 13])).toBe("ONE_PAIR");
  expect(evaluateCards([10, 5, 5, 11, 5])).toBe("THREE_OAK");
  expect(evaluateCards([13, 13, 6, 7, 7])).toBe("TWO_PAIR");
  expect(evaluateCards([13, 10, 11, 11, 10])).toBe("TWO_PAIR");
  expect(evaluateCards([12, 12, 12, 11, 14])).toBe("THREE_OAK");
});

test("07-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day07.partTwo(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});
