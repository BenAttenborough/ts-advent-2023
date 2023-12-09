import * as IO from "../helpers/io.ts";
import { Day09, differences, findNextNumberInSequence } from "./main.ts";

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

test("09-1-differences", () => {
  if (inputTest.isSuccess) {
    expect(differences([0, 3, 6, 9, 12, 15])).toStrictEqual([3, 3, 3, 3, 3]);
    expect(differences([0, 3, 6, 9, 12])).toStrictEqual([3, 3, 3, 3]);
    expect(differences([1, 3, 6, 10, 15, 21])).toStrictEqual([2, 3, 4, 5, 6]);
  } else {
    console.error(inputTest.error);
  }
});

test("09-1-findNextNumberInSequence", () => {
  if (inputTest.isSuccess) {
    expect(findNextNumberInSequence([0, 3, 6, 9, 12, 15])).toBe(18);
    expect(findNextNumberInSequence([1, 3, 6, 10, 15, 21])).toBe(28);
    expect(findNextNumberInSequence([10, 13, 16, 21, 30, 45])).toBe(68);
  } else {
    console.error(inputTest.error);
  }
});

test("09-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day09.partOne(inputTest.value)).toBe(114);
  } else {
    console.error(inputTest.error);
  }
});

test("09-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day09.partOne(inputReal.value)).toBe(1992273652);
  } else {
    console.error(inputReal.error);
  }
});

test("09-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day09.partTwo(inputTest.value)).toBe(2);
  } else {
    console.error(inputTest.error);
  }
});

test("09-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day09.partTwo(inputReal.value)).toBe(1012);
  } else {
    console.error(inputReal.error);
  }
});
