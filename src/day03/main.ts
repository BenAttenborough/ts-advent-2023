import { Utils } from "../helpers/utils.ts";

export const Day03 = {
  partOne: (input: string): number => {
    // console.log(getSurroundingCellIndexes({ x: 1, y: 1 }));
    // console.log(main(input));
    return 0;
  },
  partTwo: (input: string): number => {
    return 0;
  },
};

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

function main(input: string): number {
  let lines = input.split("\n");
  let startEndIndexes: StartEndInx[] = getStartEndIndexes(lines);
  getValidNumbers(startEndIndexes, lines, 0);
  // console.log(`startEndIndexes: ${JSON.stringify(startEndIndexes)}`);
  return lines;
}

function getValidNumbers(
  indexes: StartEndInx[],
  lines: string[],
  row: number,
): number[] {
  indexes.forEach((idx) => {
    let range = Utils.range(idx.start, idx.end);
    range.forEach((index) => {
      const surroundingCells = getSurroundingCellIndexes({
        x: row,
        y: index,
      });
    });
    //   const surroundingCells = getSurroundingCellIndexes({
    //     x: row,
    //     y: idx.start,
    //   });
    //   console.log(validateSurroundingCells(surroundingCells, lines));
  });
  // lines[row]
}

function validateSurroundingCells(
  surroundingCells: Point[],
  lines: string[],
): any {
  return surroundingCells.some((point) => {
    if (lines[point.x] === undefined || lines[point.x][point.y] === undefined) {
      return false;
    }
    const cellVal = lines[point.x][point.y];
    return cellVal !== "." && !isNumber(cellVal);
  });
}

// function validateSurroundingCells

function getStartEndIndexes(lines: string[]) {
  let startIdx = -1;
  let endIdx = -1;
  let startEndIndexes: StartEndInx[] = [];
  for (let i = 0; i < lines[0].length; i++) {
    if (isNumber(lines[0][i])) {
      if (startIdx < 0) {
        startIdx = i;
      }
      if (i === lines[0].length - 1) {
        endIdx = i;
        startEndIndexes.push({ start: startIdx, end: endIdx });
      }
    } else {
      if (startIdx >= 0) {
        endIdx = i;
        startEndIndexes.push({ start: startIdx, end: endIdx });
        startIdx = endIdx = -1;
      }
    }
  }
  return startEndIndexes;
}

function getSurroundingCellIndexes(cell: Point): Point[] {
  let surroundingCells: Point[] = [];
  for (let y = cell.y - 1; y <= cell.y + 1; ++y) {
    for (let x = cell.x - 1; x <= cell.x + 1; ++x) {
      if (!(x === cell.x && y === cell.y)) {
        surroundingCells.push({ x: x, y: y });
      }
    }
  }
  return surroundingCells;
}
