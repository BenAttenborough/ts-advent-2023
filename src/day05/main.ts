import { Utils } from "../helpers/utils.ts";

export const Day05 = {
  partOne: (input: string): number => {
    let result = input.split("\n\n");
    let seeds = result[0].slice(7).split(" ").map(Number);
    let conversionTables = getConversionTables(input);

    console.log("Part one seeds:", seeds);

    const processedSeeds = seeds.map((seed) =>
      fullyProcessSeed(conversionTables, seed),
    );
    console.log("Part one fullyProcessSeed:", processedSeeds);

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
    // console.log("seeds: ", seeds);

    // let testSeeds = [10, 10, 50, 5, 100, 20];
    // console.log("testSeeds", testSeeds);
    // let ranges = [];
    // while (seeds.length) {
    //   let start: number | undefined = seeds.shift();
    //   let range: number | undefined = seeds.shift();
    //   if (start && range) {
    //     let end = start + range;
    //     ranges.push({ start, end });
    //   }
    // }

    // console.log("ranges:", ranges);

    let seedSet = new Set<number>();
    while (seeds.length) {
      let start: number | undefined = seeds.shift();
      let range: number | undefined = seeds.shift();
      Utils.range(start, start + range - 1).forEach((seed) => {
        seedSet.add(seed);
      });
    }

    // console.log("seedSet: ", seedSet);

    let conversionTables = getConversionTables(input);

    const processedSeeds = Array.from(seedSet).map((x) =>
      fullyProcessSeed(conversionTables, x),
    );

    console.log("processedSeeds", processedSeeds);

    fullyProcessSeed(conversionTables, 79);

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
      // console.log(
      //   `conversion stage: ${conversionName[i]} start ${startingSeed} end ${seed}`,
      // );
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
    return seed - diff;
  }
  return seed;
}

export function processRange(
  [start, end]: [number, number],
  conversion: ConversionPartTwo,
): [number, number] {
  // console.log(`${start} ${end}`);
  // console.log(`conversion: ${JSON.stringify(conversion)} `);
  return [start - conversion.offset, end - conversion.offset];
}

export function splitRange(
  [inputStart, inputEnd]: [number, number],
  [targetStart, targetEnd]: [number, number],
): [[number, number]] {
  // console.log(
  //   `input start: ${inputStart}\ninput end: ${inputEnd}\ntarget start: ${targetStart}\ntarget end: ${targetEnd}`,
  // );
  if (targetStart === inputStart && targetEnd === inputEnd) {
    return [[inputStart, inputEnd]];
  }
  if (targetStart <= inputEnd && targetEnd >= inputStart) {
    let unaffectedRange: [number, number] | undefined = undefined;
    if (targetStart > inputStart) {
      unaffectedRange = [inputStart, targetStart - 1];
    } else if (targetEnd < inputEnd) {
      unaffectedRange = [targetEnd + 1, inputEnd];
    }
    return [
      unaffectedRange,
      [Math.max(inputStart, targetStart), Math.min(inputEnd, targetEnd)],
    ].filter((x) => x?.length);
  }
  return [[inputStart, inputEnd]];
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

type ConversionPartTwo = {
  start: number;
  end: number;
  offset: number;
};

export function getConversionTablesPart2(input: string): ConversionPartTwo[][] {
  let end = [];
  let blocks = input.split("\n\n");

  for (let i = 1; i < blocks.length; i++) {
    const currentBlock = blocks[i];
    const startIdx = currentBlock.indexOf(":") + 2;
    let result = currentBlock
      .slice(startIdx)
      .split("\n")
      .map((x) => x.split(" ").map(Number))
      .map(([destStart, sourceStart, rangeLength]) => {
        return {
          start: sourceStart,
          end: sourceStart + rangeLength - 1,
          offset: sourceStart - destStart,
        };
      });
    end.push(result);
  }
  return end;
}

export function splitAndProcessRange(
  [inputStart, inputEnd]: [number, number],
  conversion: ConversionPartTwo,
): [number, number][] {
  // console.log(
  //   `input start: ${inputStart}\ninput end: ${inputEnd}\ntarget start: ${targetStart}\ntarget end: ${targetEnd}`,
  // );
  if (conversion.start === inputStart && conversion.end === inputEnd) {
    return [[inputStart, inputEnd]];
  }
  if (conversion.start <= inputEnd && conversion.end >= inputStart) {
    let unaffectedRange: [number, number] | undefined = undefined;
    if (conversion.start > inputStart) {
      unaffectedRange = [inputStart, conversion.start - 1];
    } else if (conversion.end < inputEnd) {
      unaffectedRange = [conversion.end + 1, inputEnd];
    }
    let rangeToProcess: [number, number] = [
      Math.max(inputStart, conversion.start),
      Math.min(inputEnd, conversion.end),
    ];
    const processedRange = processRange(rangeToProcess, conversion);
    if (unaffectedRange) {
      return [unaffectedRange, processedRange];
    }
    return [processedRange];
  }
  return [[inputStart, inputEnd]];
}

type SeedSplit = {
  processed: [number, number][];
  unprocessed: [number, number][];
};

export function splitAndProcessRange2(
  [inputStart, inputEnd]: [number, number],
  conversion: ConversionPartTwo,
): SeedSplit {
  // console.log(
  //   `input start: ${inputStart}\ninput end: ${inputEnd}\ntarget start: ${targetStart}\ntarget end: ${targetEnd}`,
  // );
  if (conversion.start === inputStart && conversion.end === inputEnd) {
    // return [[inputStart, inputEnd]];
    return {
      processed: [],
      unprocessed: [[inputStart, inputEnd]],
    };
  }
  if (conversion.start <= inputEnd && conversion.end >= inputStart) {
    let unaffectedRange: [number, number] | undefined = undefined;
    if (conversion.start > inputStart) {
      unaffectedRange = [inputStart, conversion.start - 1];
    } else if (conversion.end < inputEnd) {
      unaffectedRange = [conversion.end + 1, inputEnd];
    }
    let rangeToProcess: [number, number] = [
      Math.max(inputStart, conversion.start),
      Math.min(inputEnd, conversion.end),
    ];
    const processedRange = processRange(rangeToProcess, conversion);
    // return [processedRange];
    return {
      processed: [processedRange],
      unprocessed: [],
    };
  }
  // return [[inputStart, inputEnd]];
  return {
    processed: [],
    unprocessed: [[inputStart, inputEnd]],
  };
}
