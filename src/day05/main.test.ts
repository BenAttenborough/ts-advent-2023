import * as IO from "../helpers/io.ts";
import {
  Day05,
  fullyProcessSeed,
  splitRange,
  processRange,
  getConversionTables,
  splitAndProcessRange,
  splitAndProcessRange2,
  splitter,
  splitRange1,
  getSeedRanges,
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

test("05-1-real", () => {
  expect(Day05.partOne(inputReal)).toBe(313045984);
});

test("05-2-partTwoProcessExperiment", () => {
  expect(Day05.partTwoProcessExperiment(inputTest)).toBe(46);
  const result = inputTest.split("\n\n");
  const seeds = result[0].slice(7).split(" ").map(Number);

  // console.log("seeds", seeds);
});

// test("05-2-partTwoProcessExperiment2", () => {
//   expect(Day05.partTwoProcessExperiment2(inputTest)).toBe(46);
// });

test("05-2-partTwoProcessExperiment3", () => {
  expect(Day05.partTwoProcessExperiment3(inputTest)).toBe(46);
});

// test("05-2-partTwoBruteForce-test", () => {
//   // expect(Day05.partTwo(inputTest)).toBe(46);
//   expect(Day05.partTwoBruteForce(inputTest)).toBe(46);

//   // const conversionTables2 = getConversionTablesPart2(inputTest);
//   // console.log("conversionTables2", conversionTables2);
// });

// test("05-2-real", () => {
//   expect(Day05.partTwo(inputReal)).toBe(0);
// });

// test("processRange", () => {
//   expect(
//     processRange([10, 20], {
//       start: 0,
//       end: 10,
//       offset: 10,
//     }),
//   ).toStrictEqual([0, 10]);

//   // let conversion = {
//   //   destinationRangeStart: 52,
//   //   sourceRangeStart: 50,
//   //   rangeLength: 48,
//   // };
//   // let ranges = [
//   //   [79, 93],
//   //   [55, 68],
//   // ];
//   // ranges = ranges.map((range) => {
//   //   let splitRanges = splitRange(range, [
//   //     conversion.sourceRangeStart,
//   //     conversion.sourceRangeStart + conversion.rangeLength - 1,
//   //   ]);
//   //   console.log("splitRanges", splitRanges);
//   //   return splitRanges;
//   // });
//   // console.log("Process ranges:", ranges);
// });

test("splitRange1", () => {
  // let conversion = {
  //   start: 0,
  //   end: 50,
  //   offset: 0,
  // };
  // let range = [40, 60];
  // expect(splitRange1(conversion, range)).toStrictEqual([]);
  let conversion = {
    start: 25,
    end: 75,
    offset: 0,
  };
  let range = [0, 100];
  // splitter(range, conversion);
  expect(splitRange1(conversion, range)).toStrictEqual({
    toProcess: [[25, 75]],
    unprocessed: [
      [0, 24],
      [76, 100],
    ],
  });
});

// test("splitter", () => {

//   expect(splitter()).toStrictEqual()
// })

// test("splitRange", () => {
//   expect(splitRange([79, 93], [50, 98])).toStrictEqual([[79, 93]]);
//   expect(splitRange([0, 50], [40, 60])).toStrictEqual([
//     [0, 39],
//     [40, 50],
//   ]);
//   // console.log(">>>", splitRange([50, 98], [98, 99]));
//   expect(splitRange([50, 98], [98, 99])).toStrictEqual([
//     [50, 97],
//     [98, 98],
//   ]);
//   // console.log(">>>", splitRange([40, 60], [0, 50]));
//   expect(splitRange([40, 60], [0, 50])).toStrictEqual([
//     [51, 60],
//     [40, 50],
//   ]);
//   expect(splitRange([40, 50], [10, 30])).toStrictEqual([[40, 50]]);
//   expect(splitRange([0, 50], [0, 60])).toStrictEqual([[0, 50]]);
//   expect(splitRange([30, 45], [40, 50])).toStrictEqual([
//     [30, 39],
//     [40, 45],
//   ]);
//   // console.log(">>>", splitRange([40, 50], [30, 45]));
//   expect(splitRange([40, 50], [30, 45])).toStrictEqual([
//     [46, 50],
//     [40, 45],
//   ]);

//   let conversion = {
//     start: 40,
//     end: 60,
//     offset: -100,
//   };

//   // let initialRange = [0, 50];
//   // console.log("initialRange", initialRange);
//   // const newRanges = splitAndProcessRange(initialRange, conversion);
//   // console.log("newRanges", newRanges);

//   // const initialRanges = [
//   //   [0, 50],
//   //   [100, 50],
//   // ];
//   // const multipleRnages = initialRanges.map((range) =>
//   //   splitAndProcessRange(range, conversion),
//   // );
//   // console.log("multipleRnages", multipleRnages.flat());

//   let initialRanges = [
//     [79, 93],
//     [55, 68],
//   ];
//   let conversion1 = {
//     start: 98,
//     end: 99,
//     offset: 48,
//   };
//   let conversion2 = {
//     start: 50,
//     end: 97,
//     offset: -2,
//   };
//   console.log("initialRanges", initialRanges);

//   const pass1 = initialRanges.map((range) =>
//     splitAndProcessRange2(range, conversion1),
//   );

//   console.log("pass1", JSON.stringify(pass1));

//   const pass2 = pass1.map((range) => {
//     console.log("Pass 1 range:", range.unprocessed);
//     return range.unprocessed.map((x) => {
//       return splitAndProcessRange2(x, conversion2);
//     });
//     // return splitAndProcessRange2(range.unprocessed, conversion2);
//   });

//   console.log("pass2", JSON.stringify(pass2));
// });

test("getSeedRanges", () => {
  expect(getSeedRanges([79, 14, 55, 13])).toStrictEqual([
    [79, 92],
    [55, 67],
  ]);
});
