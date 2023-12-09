import * as IO from "../helpers/io.ts";
import { Day08 } from "./main.ts";

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

let inputTest3: IO.result = {
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
    let temp: string = await IO.getInput(__dirname, "input_test_3.txt");
    inputTest3 = IO.success(temp);
  } catch (err) {
    inputTest3 = IO.failure(err);
  }

  try {
    let temp: string = await IO.getInput(__dirname, "input.txt");
    inputReal = IO.success(temp);
  } catch (err) {
    inputReal = IO.failure(err);
  }
});

// test("08-1-test", () => {
//   if (inputTest.isSuccess) {
//     expect(Day08.partOne(inputTest.value)).toBe(0);
//   } else {
//     console.error(inputTest.error);
//   }
// });

// test("08-1-test-2", () => {
//   if (inputTest.isSuccess) {
//     expect(Day08.partOne(inputTest2.value)).toBe(0);
//   } else {
//     console.error(inputTest.error);
//   }
// });

// test("08-1-real", () => {
//   if (inputReal.isSuccess) {
//     expect(Day08.partOne(inputReal.value)).toBe(0);
//   } else {
//     console.error(inputReal.error);
//   }
// });

// test("08-2-test", () => {
//   if (inputTest3.isSuccess) {
//     expect(Day08.partTwo(inputTest3.value)).toBe(0);
//   } else {
//     console.error(inputTest3.error);
//   }
// });

test("08-2-real", () => {
  if (inputReal.isSuccess) {
    expect(Day08.partTwo(inputReal.value)).toBe(0);
  } else {
    console.error(inputReal.error);
  }
});
