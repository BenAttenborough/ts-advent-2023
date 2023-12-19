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
    const gears = getGearIndexes(input);
    const numbers = getNumbers(input);
    let total = 0;
    gears.forEach((gear) => {
      const gearCollider = getGearColliderBoundaries(gear);
      let count = 0;
      let numbersContainer: number[] = [];
      numbers.forEach((num) => {
        if (doesCollide(num.colliderBoundaries, gearCollider)) {
          count++;
          numbersContainer.push(num.number);
          if (count == 2) {
            total += numbersContainer[0] * numbersContainer[1];
          }
        }
      });
    });
    return total;
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
      return false;
    }
    const cellVal = lines[point.y][point.x];
    return cellVal !== "." && !isNumber(cellVal);
  });
}

function getSurroundingCellIndexes(startCell: Point, endCell: Point): Point[] {
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

function getStartEndIndexesLine(line: string) {
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
  return startEndIndexes;
}

export function getGearIndexes(lines: string): Point[] {
  return lines
    .split("\n")
    .map((line, y) => {
      return Array.from(line).reduce<Point[]>((cur, next, x) => {
        if (next === "*") {
          cur.push({ x, y });
        }
        return cur;
      }, []);
    })
    .flat();
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

type FoundNumber = {
  number: number;
  indexes: Point[];
  colliderBoundaries: ColliderBoundaries;
};

export function getNumbers(lines: string): FoundNumber[] {
  let startIdx = -1;
  let endIdx = -1;
  let allNumbers: FoundNumber[] = [];
  lines.split("\n").forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (isNumber(char)) {
        if (startIdx < 0) {
          startIdx = x;
        }
        if (x === line.length - 1) {
          const indexes: Point[] = Utils.range(startIdx, x).map((x) => {
            return { x, y };
          });

          allNumbers.push({
            number: getNumberFromIndexes(lines.split("\n"), indexes),
            indexes,
            colliderBoundaries: getNumberColliderBoundaries(indexes),
          });
          startIdx = endIdx = -1;
        }
      } else {
        if (startIdx >= 0) {
          endIdx = x - 1;
          const indexes: Point[] = Utils.range(startIdx, endIdx).map((x) => {
            return { x, y };
          });
          allNumbers.push({
            number: getNumberFromIndexes(lines.split("\n"), indexes),
            indexes,
            colliderBoundaries: getNumberColliderBoundaries(indexes),
          });
          startIdx = endIdx = -1;
        }
      }
    });
  });
  return allNumbers;
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

export function getNumberColliderBoundaries(
  indexes: Point[],
): ColliderBoundaries {
  return {
    top: indexes[0].y,
    right: indexes[indexes.length - 1].x,
    bottom: indexes[indexes.length - 1].y,
    left: indexes[0].x,
  };
}

export function doesCollide(
  a: ColliderBoundaries,
  b: ColliderBoundaries,
): boolean {
  return (
    a.right >= b.left &&
    a.left <= b.right &&
    a.bottom >= b.top &&
    a.top <= b.bottom
  );
}
