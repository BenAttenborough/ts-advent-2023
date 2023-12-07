import * as IO from "../helpers/io.ts";
import { Day05, fullyProcessSeed, getConversionTables } from "./main.ts";

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

test("05-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day05.partOne(inputTest.value)).toBe(35);

    const conversionTables = getConversionTables(inputTest.value);
    expect(fullyProcessSeed(conversionTables, 79)).toBe(82);
    expect(fullyProcessSeed(conversionTables, 14)).toBe(43);
    expect(fullyProcessSeed(conversionTables, 55)).toBe(86);
    expect(fullyProcessSeed(conversionTables, 13)).toBe(35);
    expect(fullyProcessSeed(conversionTables, 81)).toBe(84);
    expect(fullyProcessSeed(conversionTables, 82)).toBe(46);
  } else {
    console.error(inputTest.error);
  }
});

test("05-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day05.partOne(inputReal.value)).toBe(313045984);
  } else {
    console.error(inputReal.error);
  }
});

test("05-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day05.partTwo(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

// test("05-2-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day05.partTwo(inputReal.value)).toBe(0);
//   } else {
//     console.error(inputReal.error);
//   }
// });
