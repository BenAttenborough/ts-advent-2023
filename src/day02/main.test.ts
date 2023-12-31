import * as IO from "../helpers/io.ts";
import { Day02 } from "./main.ts";

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

test("02-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day02.partOne(inputTest.value)).toBe(8);
  } else {
    console.error(inputTest.error);
  }
});

test("02-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day02.partOne(inputReal.value)).toBe(2449);
  } else {
    console.error(inputReal.error);
  }
});

test("02-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day02.partTwo(inputTest.value)).toBe(2286);
  } else {
    console.error(inputTest.error);
  }
});

test("02-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day02.partTwo(inputReal.value)).toBe(63981);
  } else {
    console.error(inputReal.error);
  }
});
