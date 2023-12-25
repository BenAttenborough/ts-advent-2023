import * as IO from "../helpers/io.ts";
import {
  Day10,
  addPoints,
  getOrthogonalCells,
  getOrthogonalCellsSafely,
  pipeDirection,
  pipes,
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

test("10-addPoints", () => {
  expect(addPoints({ x: 5, y: 5 }, { x: -1, y: +1 })).toStrictEqual({
    x: 4,
    y: 6,
  });
  expect(addPoints({ x: -1, y: -1 }, { x: -1, y: +1 })).toStrictEqual({
    x: -2,
    y: 0,
  });
});

// test("10-1-getOrthogonalCells", () => {
//   expect(getOrthogonalCells({ x: 0, y: 0 })).toStrictEqual([
//     { x: 0, y: -1 },
//     { x: 1, y: 0 },
//     { x: 0, y: 1 },
//     { x: -1, y: 0 },
//   ]);
// });

// test("10-getOrthongonalCellsSafely", () => {
//   expect(getOrthogonalCellsSafely({ x: 0, y: 0 }, 2, 2)).toStrictEqual([
//     { x: 1, y: 0 },
//     { x: 0, y: 1 },
//   ]);
//   expect(getOrthogonalCellsSafely({ x: 1, y: 0 }, 2, 2)).toStrictEqual([
//     { x: 1, y: 1 },
//     { x: 0, y: 0 },
//   ]);
//   expect(getOrthogonalCellsSafely({ x: 1, y: 1 }, 2, 2)).toStrictEqual([
//     { x: 1, y: 0 },
//     { x: 0, y: 1 },
//   ]);
// });

test("10 pipeDirection", () => {
  expect(pipeDirection({ x: 1, y: 0 }, pipes.get("-"))).toStrictEqual({
    x: 1,
    y: 0,
  });
  expect(pipeDirection({ x: 1, y: 0 }, pipes.get("7"))).toStrictEqual({
    x: 0,
    y: 1,
  });
});

test("10-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day10.partOne(inputTest.value)).toBe(0);
  } else {
    console.error(inputTest.error);
  }
});

// test("10-1-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day10.partOne(inputReal.value)).toBe(0);
//   } else {
//     console.error(inputReal.error);
//   }
// });

// test("10-2-test", () => {
//   if (inputTest.isSuccess) {
//     expect(Day10.partTwo(inputTest.value)).toBe(0);
//   } else {
//     console.error(inputTest.error);
//   }
// });

// test("10-2-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day10.partTwo(inputReal.value)).toBe(0);
//   } else {
//     console.error(inputReal.error);
//   }
// });
