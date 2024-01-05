import { Utils } from "../helpers/utils.ts";

export const Day05 = {
  partOne: (input: string): number => {
    let result = input.split("\n\n");
    let seeds = result[0].slice(7).split(" ").map(Number);
    let conversionTables = getConversionTables(input);

    const processedSeeds = seeds.map((seed) =>
      fullyProcessSeed(conversionTables, seed),
    );

    const answer = processedSeeds.reduce((prev, next, idx) => {
      if (idx === 0) {
        prev = next;
      }
      return next < prev ? next : prev;
    }, 0);
    // console.log(answer);

    return answer;
  },
  partTwo: (input: string): number => {
    let result = input.split("\n\n");
    let seeds = result[0].slice(7).split(" ").map(Number);
    console.log("seeds: ", seeds);

    let testSeeds = [10, 10, 50, 5, 100, 20];
    console.log("testSeeds", testSeeds);
    let testRanges = [];
    while (testSeeds.length) {
      let start: number | undefined = testSeeds.shift();
      let range: number | undefined = testSeeds.shift();
      if (start && range) {
        let end = start + range;
        testRanges.push({ start, end });
      }
    }

    console.log("testRanges", testRanges);

    let seedSet = new Set<number>();
    while (seeds.length) {
      let start: number | undefined = seeds.shift();
      let range: number | undefined = seeds.shift();
      Utils.range(start, start + range - 1).forEach((seed) => {
        seedSet.add(seed);
      });
    }

    console.log("seedSet: ", seedSet);

    let conversionTables = getConversionTables(input);

    const processedSeeds = Array.from(seedSet).map((x) =>
      fullyProcessSeed(conversionTables, x),
    );

    console.log("processedSeeds", processedSeeds);

    const answer = processedSeeds.reduce((prev, next, idx) => {
      if (idx === 0) {
        prev = next;
      }
      return next < prev ? next : prev;
    }, 0);
    console.log(answer);

    return answer;
  },
};

export function fullyProcessSeed(
  conversionTables: Conversion[][],
  seed: number,
) {
  for (let i = 0; i < conversionTables.length; i++) {
    for (let j = 0; j < conversionTables[i].length; j++) {
      const startingSeed = seed;
      seed = processSeed(seed, conversionTables[i][j]);
      if (seed !== startingSeed) {
        break;
      }
    }
  }
  return seed;
}

const conversionName = [
  "soil",
  "fertilizer",
  "water",
  "light",
  "temperature",
  "humidity",
  "location",
];

function processSeed(seed: number, conversion: Conversion): number {
  let diff: number =
    conversion.sourceRangeStart - conversion.destinationRangeStart;

  let isAboveOrEqualToRangeStart = seed >= conversion.sourceRangeStart;
  let isBelowOrEqualToRangeEnd =
    seed <= conversion.sourceRangeStart + conversion.rangeLength - 1;
  if (isAboveOrEqualToRangeStart && isBelowOrEqualToRangeEnd) {
    // const sourceRange = Utils.range(
    //   conversion.sourceRangeStart,
    //   conversion.sourceRangeStart + conversion.rangeLength - 1,
    // );
    // const destinationRange = Utils.range(
    //   conversion.destinationRangeStart,
    //   conversion.destinationRangeStart + conversion.rangeLength - 1,
    // );
    // const indexToConvert = sourceRange.findIndex((x) => x === seed);
    // return destinationRange[indexToConvert];
    return seed - diff;
  }
  return seed;
}

type Conversion = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
};

export function getConversionTables(input: string): Conversion[][] {
  let end = [];
  let blocks = input.split("\n\n");

  for (let i = 1; i < blocks.length; i++) {
    const currentBlock = blocks[i];
    const startIdx = currentBlock.indexOf(":") + 2;
    let result = currentBlock
      .slice(startIdx)
      .split("\n")
      .map((x) => x.split(" ").map(Number))
      .map((x) => {
        return {
          destinationRangeStart: x[0],
          sourceRangeStart: x[1],
          rangeLength: x[2],
        };
      });
    end.push(result);
  }
  return end;
}
