import * as IO from "../helpers/io.ts";
import { Day05, fullyProcessSeed, getConversionTables } from "./main.ts";

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

test("05-2-test", () => {
  expect(Day05.partTwo(inputTest)).toBe(46);
});

// test("05-2-real", () => {
//   expect(Day05.partTwo(inputReal)).toBe(0);
// });
