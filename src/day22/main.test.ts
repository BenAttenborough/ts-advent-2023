import * as IO from "../helpers/io.ts";
import { Day22 } from "./main.ts";

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

test("22-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day22.partOne(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

test("22-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day22.partOne(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});

test("22-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day22.partTwo(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

test("22-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day22.partTwo(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});
