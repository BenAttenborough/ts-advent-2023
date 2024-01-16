export const Day05 = {
  partOne: (input: string): number => {
    let seeds = getSeeds(input);
    let conversionTables = getConversionTables(input);
    const processedSeeds = seeds.map((seed) =>
      fullyProcessSeed(conversionTables, seed),
    );
    return Math.min(...processedSeeds);
  },

  partTwo: (input: string): number => {
    const seeds = getSeeds(input);
    const seedRanges = getSeedRanges(seeds);
    const conversionTables = getConversionTables(input);
    let currentSplitRanges: SeedSplit = convertRangesToSeedSplit(seedRanges);

    conversionTables.forEach((table) => {
      table.forEach((conversion) => {
        currentSplitRanges = splitter(currentSplitRanges, conversion);
      });
      currentSplitRanges.unprocessed = currentSplitRanges.unprocessed.concat(
        currentSplitRanges.toProcess,
      );
      currentSplitRanges.toProcess = [];
    });

    return lowestNumberInRanges(currentSplitRanges.unprocessed);
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

function getSeeds(input: string): number[] {
  const result = input.split("\n\n");
  return result[0].slice(7).split(" ").map(Number);
}

function lowestNumberInRanges(ranges: Range[]): number {
  return Math.min(...ranges.map((range) => range[0]));
}

function convertRangesToSeedSplit(ranges: Range[]): SeedSplit {
  return {
    toProcess: [],
    unprocessed: ranges,
  };
}

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
      if (seed !== startingSeed) {
        break; // Stop looking for maps once one is found and applied
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
  if (seed >= conversion.start && seed <= conversion.end) {
    return seed - conversion.offset;
  }
  return seed;
}

export function processRange(
  [start, end]: Range,
  conversion: Conversion,
): Range {
  return [start - conversion.offset, end - conversion.offset];
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

export function splitter(
  seedRanges: SeedSplit,
  conversion: Conversion,
): SeedSplit {
  let unprocessedSeedRanges = seedRanges.unprocessed;

  let container: SeedSplit = {
    toProcess: seedRanges.toProcess,
    unprocessed: [],
  };

  unprocessedSeedRanges.forEach((range: Range) => {
    let partialClaculation: SeedSplit = {
      toProcess: [],
      unprocessed: [],
    };
    partialClaculation = splitRange(conversion, range);
    const processRange = partialClaculation.toProcess.map((range) => {
      return [range[0] - conversion.offset, range[1] - conversion.offset];
    });
    container.toProcess.push(...processRange);
    container.unprocessed.push(...partialClaculation.unprocessed);
  });
  return container;
}

export function splitRange(
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
