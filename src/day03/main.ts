import { Utils } from "../helpers/utils.ts";

export const Day03 = {
  partOne: (input: string): number => {
    let lines = input.split("\n");
    let validNumbersPerLine = input.split("\n").map((line, row) => {
      let startEndIndexes: StartEndInx[] = getStartEndIndexesLine(line);
      return getValidNumbers(startEndIndexes, lines, row);
    });
    let validNumbers = validNumbersPerLine.reduce(
      (cur, next) => cur.concat(next),
      [],
    );
    let result = validNumbers.reduce((cur, next) => cur + next, 0);
    return result;
  },
  partTwo: (input: string): number => {
    let lines = input.split("\n");
    console.log(lines);
    const numberIndexes = lines.map((line, idx) =>
      getNumberIndexesLine(line, idx),
    );
    // console.log(JSON.stringify(numberIndexes));
    return 0;
  },
};

export function getNumberFrom(point: Point, puzzle: Point[]): number {
  return 0;
}

type Point = {
  x: number;
  y: number;
};

function isNumber(char: string): boolean {
  const reg = new RegExp("^[0-9]$");
  return reg.test(char);
}

type StartEndInx = {
  start: number;
  end: number;
};

function getValidNumbers(
  indexes: StartEndInx[],
  lines: string[],
  row: number,
): number[] {
  let validNumbers: number[] = [];
  indexes.forEach((idx) => {
    const surroundingCells = getSurroundingCellIndexes(
      { x: idx.start, y: row },
      { x: idx.end, y: row },
    );
    // console.log(surroundingCells);
    // console.log(validateSurroundingCells(surroundingCells, lines));
    if (validateSurroundingCells(surroundingCells, lines)) {
      let range = Utils.range(idx.start, idx.end);
      let numberAsString = "";
      range.forEach((idx) => {
        numberAsString += lines[row][idx];
      });
      if (numberAsString) {
        validNumbers.push(Number(numberAsString));
      }
    }
  });
  return validNumbers;
}

function validateSurroundingCells(
  surroundingCells: Point[],
  lines: string[],
): any {
  return surroundingCells.some((point) => {
    if (lines[point.y] === undefined || lines[point.y][point.x] === undefined) {
      // console.log("-");
      return false;
    }
    const cellVal = lines[point.y][point.x];
    // console.log(cellVal);

    return cellVal !== "." && !isNumber(cellVal);
  });
}

export function getSurroundingCellIndexes(
  startCell: Point,
  endCell: Point,
): Point[] {
  let surroundingCells: Point[] = [];
  for (let x = startCell.x - 1; x <= endCell.x + 1; ++x) {
    surroundingCells.push({ x: x, y: startCell.y - 1 });
  }
  surroundingCells.push({ x: startCell.x - 1, y: startCell.y });
  surroundingCells.push({ x: endCell.x + 1, y: startCell.y });
  for (let x = startCell.x - 1; x <= endCell.x + 1; ++x) {
    surroundingCells.push({ x: x, y: startCell.y + 1 });
  }
  return surroundingCells;
}

export function getStartEndIndexesLine(line: string) {
  let startIdx = -1;
  let endIdx = -1;
  let startEndIndexes: StartEndInx[] = [];
  line.split("").map((char, charIdx) => {
    if (isNumber(char)) {
      if (startIdx < 0) {
        startIdx = charIdx;
      }
      if (charIdx === line.length - 1) {
        startEndIndexes.push({ start: startIdx, end: charIdx });
      }
    } else {
      if (startIdx >= 0) {
        endIdx = charIdx - 1;
        startEndIndexes.push({ start: startIdx, end: endIdx });
        startIdx = endIdx = -1;
      }
    }
  });
  // console.log("startEndIndexes", startEndIndexes);
  return startEndIndexes;
}

type Coordinates = Point[][];

export function getNumberIndexesLine(line: string, y: number): Coordinates {
  let startIdx = -1;
  let endIdx = -1;
  let indexes: Coordinates = [];
  line.split("").map((char, charIdx) => {
    if (isNumber(char)) {
      if (startIdx < 0) {
        startIdx = charIdx;
      }
      if (charIdx === line.length - 1) {
        indexes.push(
          Utils.range(startIdx, charIdx).map((x) => {
            return { x, y };
          }),
        );
      }
    } else {
      if (startIdx >= 0) {
        endIdx = charIdx - 1;
        indexes.push(
          Utils.range(startIdx, endIdx).map((x) => {
            return { x, y };
          }),
        );
        startIdx = endIdx = -1;
      }
    }
  });
  // console.log("indexes", indexes);
  return indexes;
}

export function getGearIndexesLine(line: string, y: number): Point[] {
  return Array.from(line).reduce<Point[]>((cur, next, x) => {
    if (next === "*") {
      cur.push({ x, y });
    }
    return cur;
  }, []);
}

export function getNumberFromIndexes(
  lines: string[],
  coordinates: Point[],
): number {
  let numString = "";
  coordinates.forEach((point) => {
    numString += lines[point.y][point.x];
  });
  return Number(numString);
}

export function collisionDetection(
  gear: Point,
  numberLocations: Coordinates,
): number[] {
  const surroundingCells = getSurroundingCellIndexesForPoint(gear);
  // console.log(surroundingCells);
  // console.log(numberLocations);
  // const a = { x: 0, y: 0 };
  // const b = { x: 0, y: 0 };
  // console.log(a.x === b.x && a.y === b.y);
  let container = [];
  surroundingCells.forEach((cell) => {
    // console.log(cell);
    numberLocations.forEach((location) => {
      // console.log(location);
      // location.forEach((point) => {
      //   // console.log(point);
      //   if (cell.x === point.x && cell.y === point.y) {
      //     // console.log(`cell [${cell.x}, ${cell.y}] matches`);
      //     container.push(location);
      //   }
      // });
      if (location.some((point) => cell.x === point.x && cell.y === point.y)) {
        container.push(location);
      }
    });
  });
  // console.log(container);
  return [];
}

export function getSurroundingCellIndexesForPoint(cell: Point): Point[] {
  let surroundingCells: Point[] = [];
  for (let y = cell.y - 1; y <= cell.y + 1; y++) {
    for (let x = cell.x - 1; x <= cell.x + 1; x++) {
      // Exclude origin from surrounding cells
      if (!(x === cell.x && y === cell.y)) {
        surroundingCells.push({ x, y });
      }
    }
  }
  return surroundingCells;
}

type ColliderBoundaries = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export function getGearColliderBoundaries(gear: Point): ColliderBoundaries {
  return {
    top: gear.y - 1,
    right: gear.x + 1,
    bottom: gear.y + 1,
    left: gear.x - 1,
  };
}

type StartEndPoints = {
  start: Point;
  end: Point;
};

type FoundNumber = {
  number: number;
  colliderBoundaries: ColliderBoundaries;
};

export function getStartEndIndexes(line: string, y: number): FoundNumber[] {
  let startIdx = -1;
  let endIdx = -1;
  let startEndIndexes: FoundNumber[] = [];
  line.split("").map((char, charIdx) => {
    if (isNumber(char)) {
      if (startIdx < 0) {
        startIdx = charIdx;
      }
      if (charIdx === line.length - 1) {
        startEndIndexes.push({
          number: 0,
          colliderBoundaries: getNumberColliderBoundaries(
            { x: startIdx, y },
            { x: charIdx, y },
          ),
        });
      }
    } else {
      if (startIdx >= 0) {
        endIdx = charIdx - 1;
        startEndIndexes.push({
          number: 0,
          colliderBoundaries: getNumberColliderBoundaries(
            { x: startIdx, y },
            { x: endIdx, y },
          ),
        });
        startIdx = endIdx = -1;
      }
    }
  });
  console.log("startEndIndexes", startEndIndexes);
  return startEndIndexes;
}

export function getNumberColliderBoundaries(
  start: Point,
  end: Point,
): ColliderBoundaries {
  return {
    top: start.y,
    right: end.x,
    bottom: end.y,
    left: start.x,
  };
}
