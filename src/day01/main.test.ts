import * as IO from "../helpers/io.ts";
import { Day01 } from "./main.ts";

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

test("01-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day01.partOne(inputTest.value)).toBe(142);
  } else {
    console.error(inputTest.error);
  }
});

test("01-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day01.partOne(inputReal.value)).toBe(55712);
  } else {
    console.error(inputReal.error);
  }
});

test("01-2-test", () => {
  const input = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`;
  expect(Day01.partTwo(input)).toBe(281);
});

test("01-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day01.partTwo(inputReal.value)).toBe(55413);
  } else {
    console.error(inputReal.error);
  }
});
