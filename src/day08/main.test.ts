import * as IO from "../helpers/io.ts";
import { Day08 } from "./main.ts";

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

test("08-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day08.partOne(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

test("08-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day08.partOne(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});

test("08-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day08.partTwo(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

test("08-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day08.partTwo(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});
