import * as IO from "../helpers/io.ts";
import { Day01 } from "./main.ts";

let inputResult: IO.result = {
  isSuccess: false,
  value: "",
  error: null,
};

beforeAll(async () => {
  try {
    let temp: string = await IO.getInput(__dirname, "input.txt");
    inputResult = IO.success(temp);
  } catch (err) {
    inputResult = IO.failure(err);
  }
});

test("01-1", () => {
  if (inputResult.isSuccess) {
    expect(Day01.partOne(inputResult.value)).toBe(0);
  } else {
    console.error(inputResult.error);
  }
});

test("01-2", () => {
  if (inputResult.isSuccess) {
    expect(Day01.partTwo(inputResult.value)).toBe(0);
  } else {
    console.error(inputResult.error);
  }
});
