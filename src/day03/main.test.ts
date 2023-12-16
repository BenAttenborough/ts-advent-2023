import * as IO from "../helpers/io.ts";
import {
  Day03,
  getSurroundingCellIndexes,
  getStartEndIndexesLine,
  getNumberIndexesLine,
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

test("03 getStartEndIndexesLine", () => {
  expect(getStartEndIndexesLine("467..114..")).toStrictEqual([
    {
      end: 2,
      start: 0,
    },
    {
      end: 7,
      start: 5,
    },
  ]);
  expect(getStartEndIndexesLine("467..114")).toStrictEqual([
    {
      end: 2,
      start: 0,
    },
    {
      end: 7,
      start: 5,
    },
  ]);
});

test("03 getNumberIndexesLine", () => {
  expect(getNumberIndexesLine("467..114..")).toStrictEqual([
    [0, 1, 2],
    [5, 6, 7],
  ]);
  expect(getNumberIndexesLine("467..114")).toStrictEqual([
    [0, 1, 2],
    [5, 6, 7],
  ]);
});

test("03 getSurroundingCellIndexes", () => {
  expect(
    getSurroundingCellIndexes({ x: 0, y: 0 }, { x: 1, y: 0 }),
  ).toStrictEqual([
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 2, y: -1 },
    { x: -1, y: 0 },
    { x: 2, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ]);
  expect(
    getSurroundingCellIndexes({ x: 0, y: 0 }, { x: 0, y: 0 }),
  ).toStrictEqual([
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]);
});

test("03-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day03.partOne(inputTest.value)).toBe(4361);
  } else {
    console.error(inputTest.error);
  }
});

test("03-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day03.partOne(inputReal.value)).toBe(536202);
  } else {
    console.error(inputReal.error);
  }
});

// test("03-2-test", () => {
//   if (inputTest.isSuccess) {
//     expect(Day03.partTwo(inputTest.value)).toBe(2286);
//   } else {
//     console.error(inputTest.error);
//   }
// });

// test("03-2-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day03.partTwo(inputReal.value)).toBe(63981);
//   } else {
//     console.error(inputReal.error);
//   }
// });
