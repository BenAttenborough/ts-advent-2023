import * as IO from "../helpers/io.ts";
import {
  Day05,
  fullyProcessSeed,
  getConversionTables,
  splitRange,
} from "./main.ts";

let inputTest = "";
let inputReal = "";

beforeAll(async () => {
  inputTest = await IO.getInput(__dirname, "input_test.txt");
  inputReal = await IO.getInput(__dirname, "input.txt");
});

// test("05-1-test", () => {
//   expect(Day05.partOne(inputTest)).toBe(35);

//   const conversionTables = getConversionTables(inputTest);
//   expect(fullyProcessSeed(conversionTables, 79)).toBe(82);
//   expect(fullyProcessSeed(conversionTables, 14)).toBe(43);
//   expect(fullyProcessSeed(conversionTables, 55)).toBe(86);
//   expect(fullyProcessSeed(conversionTables, 13)).toBe(35);
//   expect(fullyProcessSeed(conversionTables, 81)).toBe(84);
//   expect(fullyProcessSeed(conversionTables, 82)).toBe(46);
// });

// test("05-1-real", () => {
//   expect(Day05.partOne(inputReal)).toBe(313045984);
// });

// test("05-2-test", () => {
//   // expect(Day05.partTwo(inputTest)).toBe(46);
//   expect(Day05.partTwo(inputTest)).toBe(0);
// });

// test("05-2-real", () => {
//   expect(Day05.partTwo(inputReal)).toBe(0);
// });

test("splitRange", () => {
  expect(splitRange([79, 93], [50, 98])).toStrictEqual([[79, 93]]);
  expect(splitRange([0, 50], [40, 60])).toStrictEqual([
    [0, 39],
    [40, 50],
  ]);
  // console.log(">>>", splitRange([50, 98], [98, 99]));
  expect(splitRange([50, 98], [98, 99])).toStrictEqual([
    [50, 97],
    [98, 98],
  ]);
  // console.log(">>>", splitRange([40, 60], [0, 50]));
  expect(splitRange([40, 60], [0, 50])).toStrictEqual([
    [51, 60],
    [40, 50],
  ]);
  expect(splitRange([40, 50], [10, 30])).toStrictEqual([[40, 50]]);
  expect(splitRange([0, 50], [0, 60])).toStrictEqual([[0, 50]]);
  expect(splitRange([30, 45], [40, 50])).toStrictEqual([
    [30, 39],
    [40, 45],
  ]);
  // console.log(">>>", splitRange([40, 50], [30, 45]));
  expect(splitRange([40, 50], [30, 45])).toStrictEqual([
    [46, 50],
    [40, 45],
  ]);
});
