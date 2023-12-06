import * as IO from "../helpers/io.ts";
import { Day17 } from "./main.ts";

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

test("17-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day17.partOne(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

test("17-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day17.partOne(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});

test("17-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day17.partTwo(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

test("17-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day17.partTwo(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});
