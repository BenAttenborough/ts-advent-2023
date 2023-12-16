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

type NumberSequence = number[];

export function getNumberIndexesLine(line: string) {
  let startIdx = -1;
  let endIdx = -1;
  let indexes: NumberSequence[] = [];
  line.split("").map((char, charIdx) => {
    if (isNumber(char)) {
      if (startIdx < 0) {
        startIdx = charIdx;
      }
      if (charIdx === line.length - 1) {
        indexes.push(Utils.range(startIdx, charIdx));
      }
    } else {
      if (startIdx >= 0) {
        endIdx = charIdx - 1;
        indexes.push(Utils.range(startIdx, endIdx));
        startIdx = endIdx = -1;
      }
    }
  });
  console.log("indexes", indexes);
  return indexes;
}
