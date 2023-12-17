import * as IO from "../helpers/io.ts";
import {
  Day0302,
  getGearIndexes,
  getGearColliderBoundaries,
  getNumbers,
  getNumberFromIndexes,
  isNumber,
  doesCollide,
} from "./solution2.ts";

let inputTest: IO.result = {
  isSuccess: false,
  value: "",
  error: null,
};

let inputTest2: IO.result = {
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
    let temp: string = await IO.getInput(__dirname, "input_test_2.txt");
    inputTest2 = IO.success(temp);
  } catch (err) {
    inputTest2 = IO.failure(err);
  }

  try {
    let temp: string = await IO.getInput(__dirname, "input.txt");
    inputReal = IO.success(temp);
  } catch (err) {
    inputReal = IO.failure(err);
  }
});

// test("Day0302", () => {
//   if (inputTest.isSuccess) {
//     expect(Day0302.partTwo(inputTest.value)).toBe(0);
//     expect(getGearIndexes(inputTest.value)).toStrictEqual([
//       { x: 3, y: 1 },
//       { x: 3, y: 4 },
//       { x: 5, y: 8 },
//     ]);
//     expect(getGearColliderBoundaries({ x: 1, y: 1 })).toStrictEqual({
//       top: 0,
//       right: 2,
//       bottom: 2,
//       left: 0,
//     });
//     expect(getGearColliderBoundaries({ x: 0, y: 0 })).toStrictEqual({
//       top: 0,
//       right: 1,
//       bottom: 1,
//       left: 0,
//     });
//     console.log(
//       doesCollide(
//         { top: 0, right: 4, bottom: 2, left: 2 },
//         { top: 0, right: 2, bottom: 0, left: 0 },
//       ),
//     );
//   } else {
//     console.error(inputTest.error);
//   }
// });

// test("03-1-getNumberFromIndexes", () => {
//   expect(
//     getNumberFromIndexes(
//       ["617*.*...."],
//       [
//         { x: 0, y: 0 },
//         { x: 1, y: 0 },
//         { x: 2, y: 0 },
//       ],
//     ),
//   ).toStrictEqual(617);
// });

test("03-2-test", () => {
  if (inputReal.isSuccess) {
    expect(Day0302.partTwo(inputTest.value)).toBe(467835);
  } else {
    console.error(inputReal.error);
  }
});

test("03-2-test-2", () => {
  if (inputTest2.isSuccess) {
    expect(Day0302.partTwo(inputTest2.value)).toBe(467835);
  } else {
    console.error(inputTest2.error);
  }
});

test("03-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day0302.partTwo(inputReal.value)).toBe(78272573);
  } else {
    console.error(inputReal.error);
  }
});
