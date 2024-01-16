import { Utils } from "../helpers/utils.ts";

export const Day05 = {
  partOne: (input: string): number => {
    let result = input.split("\n\n");
    let seeds = result[0].slice(7).split(" ").map(Number);
    let conversionTables = getConversionTables(input);

    // console.log("Part one seeds:", seeds);

    const processedSeeds = seeds.map((seed) =>
      fullyProcessSeed(conversionTables, seed),
    );
    // console.log("Part one fullyProcessSeed:", processedSeeds);

    const answer = processedSeeds.reduce((prev, next, idx) => {
      if (idx === 0) {
        prev = next;
      }
      return next < prev ? next : prev;
    }, 0);
    // console.log(answer);

    return answer;
  },

  partTwoBruteForce: (input: string): number => {
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

    // console.log("processedSeeds", processedSeeds);

    fullyProcessSeed(conversionTables, 79);

    const answer = processedSeeds.reduce((prev, next, idx) => {
      if (idx === 0) {
        prev = next;
      }
      return next < prev ? next : prev;
    }, 0);
    // console.log(answer);

    return answer;
  },

  partTwoProcessExperiment: (input: string): number => {
    let result = input.split("\n\n");
    let seeds = result[0].slice(7).split(" ").map(Number);

    let seedSet = new Set<number>();
    while (seeds.length) {
      let start: number | undefined = seeds.shift();
      let range: number | undefined = seeds.shift();
      Utils.range(start, start + range - 1).forEach((seed) => {
        seedSet.add(seed);
      });
    }

    let conversionTables = getConversionTables(input);
    let currentSeeds = Array.from(seedSet);
    let contrainer: number[] = [];

    conversionName.forEach((conversion, conversionIdx) => {
      currentSeeds = currentSeeds.map((seed) => {
        return processMap(conversionTables, conversionIdx, seed);
      });
      // console.log(`Process ${conversion}: ${Math.min(...currentSeeds)}`);
      contrainer.push(Math.min(...currentSeeds));
    });

    // console.log("Container:", contrainer);

    return contrainer[contrainer.length - 1];
  },

  partTwoProcessExperiment2: (input: string): number => {
    let result = input.split("\n\n");
    let seeds = result[0].slice(7).split(" ").map(Number);
    let seedSet = new Set<number>();
    seedSet.add(82);

    // console.log("seedSet", seedSet);

    let conversionTables = getConversionTables(input);

    const processedSeeds = Array.from(seedSet).map((x) => {
      let currentSeed = x;
      for (let i = 0; i < conversionName.length; i++) {
        currentSeed = processMap(conversionTables, i, currentSeed);
        // console.log(
        //   `Seed set after ${conversionName[i]} process: ${currentSeed}`,
        // );
      }

      return currentSeed;
    });

    // console.log("processSoil", processedSeeds);
    // console.log("processSoil min", Math.min(...processedSeeds));
  },

  partTwoProcessExperiment3: (input: string): number => {
    const result = input.split("\n\n");
    const seeds = result[0].slice(7).split(" ").map(Number);
    const seedRanges = getSeedRanges(seeds);
    const conversionTables = getConversionTables(input);

    console.log("x3 seed ranges:", seedRanges);
    // console.log("conversionTables:", conversionTables);

    const testRange: Range = [79, 92];
    // const splitRange: SeedSplit = splitter(
    //   {
    //     toProcess: [],
    //     unprocessed: [testRange],
    //   },
    //   conversionTables[0][1],
    // );
    // console.log("splitRange", splitRange);

    let currentSplitRanges: SeedSplit = convertRangesToSeedSplit(seedRanges);
    // console.log("currentSplitRanges", currentSplitRanges);

    let currentSplitRanges2: SeedSplit = {
      toProcess: [],
      unprocessed: [
        [79, 92],
        [55, 67],
      ],
    };

    // let currentSplitRanges2: SeedSplit = {
    //   toProcess: [],
    //   unprocessed: [[82, 82]],
    // };

    // console.log(processSeedSplit(currentSplitRanges, conversionTables[0]));
    // console.log("conversionTables[0]", conversionTables[0]);
    // conversionTables[0].forEach((conversion) => {
    //   currentSplitRanges2 = splitter(currentSplitRanges2, conversion);
    //   // console.log("currentSplitRanges2", currentSplitRanges2);
    // });
    conversionTables.forEach((table, idx) => {
      console.log(conversionName[idx]);
      table.forEach((conversion) => {
        currentSplitRanges2 = splitter(currentSplitRanges2, conversion);
        // console.log("currentSplitRanges2", currentSplitRanges2);
        // console.log("OFFSET", conversion.offset);
        // currentSplitRanges2.toProcess = currentSplitRanges2.toProcess.map(
        //   (range) => {
        //     return [range[0] - conversion.offset, range[1] - conversion.offset];
        //   },
        // );

        console.log("intermediate currentSplitRanges2", currentSplitRanges2);
      });
      currentSplitRanges2.unprocessed = currentSplitRanges2.unprocessed.concat(
        currentSplitRanges2.toProcess,
      );
      currentSplitRanges2.toProcess = [];
      console.log("currentSplitRanges2", currentSplitRanges2);
    });

    // console.log("currentSplitRanges2", currentSplitRanges2);
    // currentSplitRanges2 = splitter(currentSplitRanges2, conversionTables[0][0]);

    // conversionName.forEach((conversion, conversionIdx) => {
    //   seedRanges = seedRanges.map((range) => {
    //     let splitRange: SeedSplit = splitter(
    //       {
    //         toProcess: [],
    //         unprocessed: [testRange],
    //       },
    //       conversionTables[0][1],
    //     );
    //     // return processMap(conversionTables, conversionIdx, seed);
    //   });
    //   // console.log(`Process ${conversion}: ${Math.min(...currentSeeds)}`);
    //   contrainer.push(Math.min(...currentSeeds));
    // });
  },
};

type Conversion = {
  start: number;
  end: number;
  offset: number;
};

type Range = [number, number];

type SeedSplit = {
  toProcess: Range[];
  unprocessed: Range[];
};

function convertRangesToSeedSplit(ranges: Range[]): SeedSplit {
  return {
    toProcess: [],
    unprocessed: ranges,
  };
}

// export function processSeedSplit(
//   seedSplit: SeedSplit,
//   conversionTable: Conversion[],
// ): SeedSplit {
//   conversionTable.forEach((table) => {
//     seedSplit = splitter(seedSplit, table);
//     // console.log("processSeedSplit", seedSplit);
//   });
//   return seedSplit;
// }

export function processMap(
  conversionTables: Conversion[][],
  mapIdx: number,
  seed: number,
) {
  for (let i = 0; i < conversionTables[mapIdx].length; i++) {
    const startingSeed = seed;
    seed = processSeed(seed, conversionTables[mapIdx][i]);
    if (seed !== startingSeed) {
      break; // Stop looking for maps once one is found and applied
    }
  }
  return seed;
}

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
        break; // Stop looking for maps once one is found and applied
      }
    }
    // if (i === 0) {
    //   console.log(`conversion stage: ${conversionName[i]} end ${seed}`);
    // }
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
  if (seed >= conversion.start && seed <= conversion.end) {
    return seed - conversion.offset;
  }
  return seed;
}

export function processRange(
  [start, end]: Range,
  conversion: Conversion,
): Range {
  // console.log(`${start} ${end}`);
  // console.log(`conversion: ${JSON.stringify(conversion)} `);
  return [start - conversion.offset, end - conversion.offset];
}

export function splitRange(
  [inputStart, inputEnd]: Range,
  [targetStart, targetEnd]: Range,
): [Range] {
  // console.log(
  //   `input start: ${inputStart}\ninput end: ${inputEnd}\ntarget start: ${targetStart}\ntarget end: ${targetEnd}`,
  // );
  if (targetStart === inputStart && targetEnd === inputEnd) {
    return [[inputStart, inputEnd]];
  }
  if (targetStart <= inputEnd && targetEnd >= inputStart) {
    let unaffectedRange: Range | undefined = undefined;
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
  [inputStart, inputEnd]: Range,
  conversion: Conversion,
): Range[] {
  // console.log(
  //   `input start: ${inputStart}\ninput end: ${inputEnd}\ntarget start: ${targetStart}\ntarget end: ${targetEnd}`,
  // );
  if (conversion.start === inputStart && conversion.end === inputEnd) {
    return [[inputStart, inputEnd]];
  }
  if (conversion.start <= inputEnd && conversion.end >= inputStart) {
    let unaffectedRange: Range | undefined = undefined;
    if (conversion.start > inputStart) {
      unaffectedRange = [inputStart, conversion.start - 1];
    } else if (conversion.end < inputEnd) {
      unaffectedRange = [conversion.end + 1, inputEnd];
    }
    let rangeToProcess: Range = [
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

export function splitAndProcessRange2(
  [inputStart, inputEnd]: Range,
  conversion: Conversion,
): SeedSplit {
  // console.log(
  //   `input start: ${inputStart}\ninput end: ${inputEnd}\ntarget start: ${targetStart}\ntarget end: ${targetEnd}`,
  // );
  if (conversion.start === inputStart && conversion.end === inputEnd) {
    // return [[inputStart, inputEnd]];
    return {
      toProcess: [],
      unprocessed: [[inputStart, inputEnd]],
    };
  }
  if (conversion.start <= inputEnd && conversion.end >= inputStart) {
    let unaffectedRange: Range | undefined = undefined;
    if (conversion.start > inputStart) {
      unaffectedRange = [inputStart, conversion.start - 1];
    } else if (conversion.end < inputEnd) {
      unaffectedRange = [conversion.end + 1, inputEnd];
    }
    let rangeToProcess: Range = [
      Math.max(inputStart, conversion.start),
      Math.min(inputEnd, conversion.end),
    ];
    const processedRange = processRange(rangeToProcess, conversion);
    // return [processedRange];
    return {
      toProcess: [processedRange],
      unprocessed: [],
    };
  }
  // return [[inputStart, inputEnd]];
  return {
    toProcess: [],
    unprocessed: [[inputStart, inputEnd]],
  };
}

export function splitter(
  seedRanges: SeedSplit,
  conversion: Conversion,
): SeedSplit {
  // console.log(
  //   `Splitter seeds: ${JSON.stringify(seeds)} conversion: ${JSON.stringify(
  //     conversion,
  //   )}`,
  // );

  console.log("Splitter seeds:", seedRanges);

  let unprocessedSeedRanges = seedRanges.unprocessed;
  // console.log("unprocessedSeedRanges", unprocessedSeedRanges);

  let container: SeedSplit = {
    toProcess: seedRanges.toProcess,
    unprocessed: [],
  };

  unprocessedSeedRanges.forEach((range: Range) => {
    // console.log(
    //   `conversion.start ${conversion.start}, conversion.end ${conversion.end}, range ${range}`,
    // );
    let partialClaculation: SeedSplit = {
      toProcess: [],
      unprocessed: [],
    };
    partialClaculation = splitRange1(conversion, range);
    const processRange = partialClaculation.toProcess.map((range) => {
      return [range[0] - conversion.offset, range[1] - conversion.offset];
    });
    container.toProcess.push(...processRange);
    container.unprocessed.push(...partialClaculation.unprocessed);
  });
  // console.log("container", container);
  return container;
}

export function splitRange1(
  conversion: Conversion,
  [inputStart, inputEnd]: Range,
): SeedSplit {
  let container: SeedSplit = {
    toProcess: [],
    unprocessed: [],
  };
  if (conversion.start === inputStart && conversion.end === inputEnd) {
    container.toProcess.push([inputStart, inputEnd]);
  }
  if (conversion.start <= inputEnd && conversion.end >= inputStart) {
    let unaffectedRangeStart: Range | undefined = undefined;
    let unaffectedRangeEnd: Range | undefined = undefined;
    if (conversion.start > inputStart) {
      unaffectedRangeStart = [inputStart, conversion.start - 1];
    }
    if (conversion.end < inputEnd) {
      unaffectedRangeEnd = [conversion.end + 1, inputEnd];
    }
    // console.log("unaffectedRange", unaffectedRange);
    container.toProcess.push([
      Math.max(inputStart, conversion.start),
      Math.min(inputEnd, conversion.end),
    ]);
    if (unaffectedRangeStart) {
      container.unprocessed.push(unaffectedRangeStart);
    }
    if (unaffectedRangeEnd) {
      container.unprocessed.push(unaffectedRangeEnd);
    }
  } else {
    container.unprocessed.push([inputStart, inputEnd]);
  }
  // console.log("splitRange1 container", container);
  return container;
}

export function getSeedRanges(seeds: number[]): Range[] {
  let seedRanges: Range[] = [];
  while (seeds.length) {
    let start: number = seeds.shift() ?? 0;
    let end: number = seeds.shift() ?? start;
    seedRanges.push([start, start + end - 1]);
  }
  return seedRanges;
}
