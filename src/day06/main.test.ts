import * as IO from "../helpers/io.ts";
import {
  Day06,
  distanceOverTime,
  multDistances,
  numbersAboveValue,
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

test("06 distanceOverTime", () => {
  expect(distanceOverTime(7)).toStrictEqual([0, 6, 10, 12, 12, 10, 6, 0]);
});

test("06 multDistances", () => {
  expect(multDistances([4, 8, 9])).toBe(288);
});
test("06 numbersAboveValue", () => {
  expect(numbersAboveValue([0, 6, 10, 12, 12, 10, 6, 0], 9)).toBe(4);
});

test("06-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day06.partOne(inputTest.value)).toBe(288);
  } else {
    console.error(inputTest.error);
  }
});

test("06-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day06.partOne(inputReal.value)).toBe(1159152);
  } else {
    console.error(inputReal.error);
  }
});

test("06-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day06.partTwo(inputTest.value)).toBe(71503);
  } else {
    console.error(inputTest.error);
  }
});

test("06-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day06.partTwo(inputReal.value)).toBe(41513103);
  } else {
    console.error(inputReal.error);
  }
});
