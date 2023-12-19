import * as IO from "../helpers/io.ts";
import { Day07, getInfoOnHands, evaluateCards } from "./main.ts";

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
  expect(getInfoOnHands(["K", "K", "6", "7", "7"])).toStrictEqual([
    {
      cardType: "K",
      number: 2,
    },
    {
      cardType: "6",
      number: 1,
    },
    {
      cardType: "7",
      number: 2,
    },
  ]);
});
test("07-getInfoOnHands", () => {
  expect(evaluateCards(["3", "2", "T", "3", "K"])).toBe("ONE_PAIR");
  expect(evaluateCards(["T", "5", "5", "J", "5"])).toBe("THREE_OAK");
  expect(evaluateCards(["K", "K", "6", "7", "7"])).toBe("TWO_PAIR");
  expect(evaluateCards(["K", "T", "J", "J", "T"])).toBe("TWO_PAIR");
  expect(evaluateCards(["Q", "Q", "Q", "J", "A"])).toBe("THREE_OAK");
});

test("07-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day07.partTwo(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});
