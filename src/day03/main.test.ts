import * as IO from "../helpers/io.ts";
import { Day03, getSurroundingCellIndexesMega } from "./main.ts";

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

test("03 getSurroundingCellIndexesMega", () => {
  console.log(getSurroundingCellIndexesMega({ x: 0, y: 0 }, 2));
});

// test("03-1-test", () => {
//   if (inputTest.isSuccess) {
//     expect(Day03.partOne(inputTest.value)).toBe(0);
//   } else {
//     console.error(inputTest.error);
//   }
// });

// test("03-1-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day03.partOne(inputReal.value)).toBe(2449);
//   } else {
//     console.error(inputReal.error);
//   }
// });

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
