import * as IO from "../helpers/io.ts";
import {
  Day10,
  addPoints,
  getOrthogonalCells,
  getOrthogonalCellsSafely,
  pipeDirection,
  pipes,
  getCompatiblePipes,
  getOutput,
} from "./main.ts";

let inputTest: IO.result = {
  isSuccess: false,
  value: "",
  error: null,
};

let inputComplex: IO.result = {
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
    let temp: string = await IO.getInput(__dirname, "input_complex.txt");
    inputComplex = IO.success(temp);
  } catch (err) {
    inputComplex = IO.failure(err);
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

test("10-checkCompatiblePipes", () => {
  expect(
    getCompatiblePipes({
      up: { inputs: [], outputs: [] },
      right: { inputs: ["LEFT", "RIGHT"], outputs: ["LEFT", "RIGHT"] },
      down: { inputs: ["DOWN", "UP"], outputs: ["DOWN", "UP"] },
      left: { inputs: [], outputs: [] },
    }),
  ).toStrictEqual(["DOWN", "RIGHT"]);

  try {
    getCompatiblePipes({
      up: { inputs: ["DOWN", "UP"], outputs: [] },
      right: { inputs: ["LEFT", "RIGHT"], outputs: ["LEFT", "RIGHT"] },
      down: { inputs: ["DOWN", "UP"], outputs: ["DOWN", "UP"] },
      left: { inputs: [], outputs: [] },
    });
  } catch (e) {
    expect(e).toStrictEqual(
      new Error("Pipe does not connect to 2 others, connects to 3"),
    );
  }

  expect(
    getCompatiblePipes({
      up: { inputs: ["LEFT", "RIGHT"], outputs: ["LEFT", "RIGHT"] },
      right: { inputs: ["LEFT", "RIGHT"], outputs: ["LEFT", "RIGHT"] },
      down: { inputs: ["DOWN", "UP"], outputs: ["DOWN", "UP"] },
      left: { inputs: [], outputs: [] },
    }),
  ).toStrictEqual(["DOWN", "RIGHT"]);
});

test("10-getOutput", () => {
  expect(getOutput({ outputs: ["UP", "DOWN"] }, "DOWN")).toBe("DOWN");
  expect(getOutput({ outputs: ["UP", "RIGHT"] }, "DOWN")).toBe("RIGHT");
  expect(getOutput({ outputs: ["LEFT", "RIGHT"] }, "RIGHT")).toBe("RIGHT");
});

test("10-1-test", () => {
  if (inputTest.isSuccess) {
    expect(Day10.partOne(inputTest.value)).toBe(4);
  } else {
    console.error(inputTest.error);
  }
});

test("10-1-test-complex", () => {
  if (inputComplex.isSuccess) {
    expect(Day10.partOne(inputComplex.value)).toBe(8);
  } else {
    console.error(inputComplex.error);
  }
});

test("10-1-real", () => {
  if (inputReal.isSuccess) {
    expect(Day10.partOne(inputReal.value)).toBe(6842);
  } else {
    console.error(inputReal.error);
  }
});

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
