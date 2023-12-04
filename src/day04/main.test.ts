import * as IO from "../helpers/io.ts";
import { Day04 } from "./main.ts";

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

test("04-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day04.partOne(inputTest.value)).toBe(13);
  } else {
    console.error(inputTest.error);
  }
});

test("04-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day04.partOne(inputReal.value)).toBe(21158);
  } else {
    console.error(inputReal.error);
  }
});

test("04-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day04.partTwo(inputTest.value)).toBe(30);
  } else {
    console.error(inputTest.error);
  }
});

test("04-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day04.partTwo(inputReal.value)).toBe(6050769);
  } else {
    console.error(inputReal.error);
  }
});
