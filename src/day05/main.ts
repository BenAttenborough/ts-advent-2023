import { Utils } from "../helpers/utils.ts";

export const Day05 = {
  partOne: (input: string): number => {
    // console.log(input);

    let result = input.split("\n\n");
    let seeds = result[0].slice(7).split(" ").map(Number);
    // console.log(seeds);
    // console.log(result);
    let conversionTables = getConversionTables(input);

    // let seed = 13;
    // seed = fullyProcessSeed(conversionTables, seed);
    const processedSeeds = seeds.map((x) =>
      fullyProcessSeed(conversionTables, x),
    );

    // console.log(processedSeeds);
    console.log(
      processedSeeds.reduce((prev, next, idx) => {
        if (idx === 0) {
          prev = next;
        }
        return next < prev ? next : prev;
      }, 0),
    );

    // console.log(seed);
    // let test = processSeed(79, {
    //   destinationRangeStart: 52,
    //   sourceRangeStart: 50,
    //   rangeLength: 48,
    // });
    // console.log(test);
    // console.log(`conversionTables: ${JSON.stringify(conversionTables)}`);
    // let test = processSeed(53, {
    //   destinationRangeStart: 50,
    //   sourceRangeStart: 98,
    //   rangeLength: 2,
    // });
    // console.log(test);

    return 0;
  },
  partTwo: (input: string): number => {
    return 0;
  },
};

export function fullyProcessSeed(
  conversionTables: Conversion[][],
  seed: number,
) {
  // console.log("SEED ", seed);
  const startingSeed = seed;
  for (let i = 0; i < conversionTables.length; i++) {
    // console.log(`Converting seed ${seed} to ${conversionName[i]}`);
    for (let j = 0; j < conversionTables[i].length; j++) {
      seed = processSeed(seed, conversionTables[i][j]);
      //   console.log(`seed after [${i}][${j}]: ${seed}`);
    }
    // console.log(`${conversionName[i]} stage converted input to ${seed}`);
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
  let diff = conversion.sourceRangeStart - conversion.destinationRangeStart;

  // console.log(
  //   `converting ${seed} with destinationRangeStart: ${conversion.destinationRangeStart} sourceRangeStart:${conversion.sourceRangeStart} rangeLength:${conversion.rangeLength}`,
  // );
  let isAboveOrEqualToRangeStart = seed >= conversion.sourceRangeStart;
  let isBelowOrEqualToRangeEnd =
    seed <= conversion.sourceRangeStart + conversion.rangeLength - 1;
  //   console.log(
  //     `isAboveOrEqualToRangeStart: ${isAboveOrEqualToRangeStart}, isBelowOrEqualToRangeEnd: ${isBelowOrEqualToRangeEnd}`,
  //   );
  //   console.log(`Seed: ${seed}, diff: ${diff}`);
  if (isAboveOrEqualToRangeStart && isBelowOrEqualToRangeEnd) {
    // console.log("Fantastic");
    const sourceRange = Utils.range(
      conversion.sourceRangeStart,
      conversion.sourceRangeStart + conversion.rangeLength - 1,
    );
    const destinationRange = Utils.range(
      conversion.destinationRangeStart,
      conversion.destinationRangeStart + conversion.rangeLength - 1,
    );
    // console.log("destinationRange ", destinationRange);
    // console.log("sourceRange ", sourceRange);

    const indexToConvert = sourceRange.findIndex((x) => x === seed);
    // console.log("index to convert ", indexToConvert);
    return destinationRange[indexToConvert];
    // return seed - diff;
  } else {
    // console.log("NO WORK TO BE DONE");
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
  //   console.log(end);
  return end;
}
