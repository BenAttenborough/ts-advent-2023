import * as IO from "../helpers/io.ts";
import {
  Day03,
  getSurroundingCellIndexes,
  getStartEndIndexesLine,
  getNumberIndexesLine,
  getGearIndexesLine,
  getNumberFromIndexes,
  collisionDetection,
  getGearColliderBoundaries,
  getStartEndIndexes,
  getNumberFromStartEndIndexes,
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
  expect(getNumberIndexesLine("467..114..", 4)).toStrictEqual([
    [
      {
        x: 0,
        y: 4,
      },
      {
        x: 1,
        y: 4,
      },
      {
        x: 2,
        y: 4,
      },
    ],
    [
      {
        x: 5,
        y: 4,
      },
      {
        x: 6,
        y: 4,
      },
      {
        x: 7,
        y: 4,
      },
    ],
  ]);
  expect(getNumberIndexesLine("467..114", 4)).toStrictEqual([
    [
      {
        x: 0,
        y: 4,
      },
      {
        x: 1,
        y: 4,
      },
      {
        x: 2,
        y: 4,
      },
    ],
    [
      {
        x: 5,
        y: 4,
      },
      {
        x: 6,
        y: 4,
      },
      {
        x: 7,
        y: 4,
      },
    ],
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

test("03-1-getGearIndexes", () => {
  if (inputTest.isSuccess) {
    expect(getGearIndexesLine("617*.*....", 4)).toStrictEqual([
      { x: 3, y: 4 },
      { x: 5, y: 4 },
    ]);
  } else {
    console.error(inputTest.error);
  }
});

test("03-1-getGearIndexes", () => {
  expect(
    collisionDetection({ x: 1, y: 1 }, [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
    ]),
  ).toStrictEqual([]);
});
test("03-1-getGridColliderBoundaries", () => {
  expect(getGearColliderBoundaries({ x: 1, y: 1 })).toStrictEqual({
    top: 0,
    right: 2,
    bottom: 2,
    left: 0,
  });
  expect(getGearColliderBoundaries({ x: 0, y: 0 })).toStrictEqual({
    top: -1,
    right: 1,
    bottom: 1,
    left: -1,
  });
});

test("03-1-getNumberFromIndexes", () => {
  expect(
    getNumberFromIndexes(
      ["617*.*...."],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
    ),
  ).toStrictEqual(617);
});

// test("03-1-getStartEndIndexes", () => {
//   expect(getStartEndIndexes("617*.*123.")).toStrictEqual([
//     {
//       number: 0,
//       colliderBoundaries: {
//         top: 0,
//         right: 2,
//         bottom: 0,
//         left: 0,
//       },
//     },
//     {
//       number: 0,
//       colliderBoundaries: {
//         top: 0,
//         right: 8,
//         bottom: 0,
//         left: 6,
//       },
//     },
//   ]);
// });

test("getNumberFromStartEndIndexes", () => {
  expect(1).toEqual(1);
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

test("03-2-test", () => {
  if (inputTest.isSuccess) {
    expect(Day03.partTwo(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

// test("03-2-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day03.partTwo(inputReal.value)).toBe(63981);
//   } else {
//     console.error(inputReal.error);
//   }
// });
