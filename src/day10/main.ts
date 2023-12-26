import { Grid } from "../helpers/utils.ts";

function dirs(top: any, right: any, bottom: any, left: any) {
  return { top, right, bottom, left };
}

export const Day10 = {
  partOne: (input: string): number => {
    const grid = new Grid(input.split("\n").map((x) => x.split("")));
    grid.setPosition(...grid.findFirst("S"));
    // grid.setPosition(grid.findFirst("S")[0], grid.findFirst("S")[1]);
    console.log(grid);
    console.log(grid.getOrthogonalValues(...grid.position));
    console.log(dirs(...grid.getOrthogonalValuesFromCurrentPosition()));
    // const startLocation = findInGrid(`S`, result);
    // console.log(startLocation);
    // const cellsOrthogonalToStart = getOrthogonalCellsSafely(
    //   startLocation,
    //   result[0].length,
    //   result.length,
    // );
    // console.log(
    //   "cellsOrthogonalToStart",
    //   cellsOrthogonalToStart.map(
    //     (orthogonalCell) =>
    //       result[orthogonalCell.cell.y][orthogonalCell.cell.x],
    //   ),
    // );
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

export function findInGrid(char: string, grid: String[][]): Point {
  let x = 0;
  let y = 0;
  grid.forEach((yVal, yIdex) => {
    yVal.forEach((xVal, xIdx) => {
      if (xVal === char) {
        x = xIdx;
        y = yIdex;
      }
    });
  });
  return { x, y };
}

type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

type OrthogonalCell = {
  direction: Direction;
  cell: Point;
};

type Pipe = "|" | "-" | "L" | "J" | "7" | "F" | ".";

export const pipes = new Map<Pipe, Point[]>([
  [
    "|",
    [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ],
  ],
  [
    "-",
    [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ],
  ],
  [
    "L",
    [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
    ],
  ],
  [
    "J",
    [
      { x: -1, y: 0 },
      { x: -1, y: 0 },
    ],
  ],
  [
    "7",
    [
      { x: -1, y: 0 },
      { x: 0, y: 1 },
    ],
  ],
  [
    "F",
    [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ],
  ],
  [
    ".",
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  ],
]);

export function oppositeSide(number: number): number {
  if (number === 0) {
    return 0;
  } else {
    if (number < 0) {
      return 1;
    } else {
      return -1;
    }
  }
}

export function addPoints(pointA: Point, pointB: Point): Point {
  return {
    x: pointA.x + pointB.x,
    y: pointA.y + pointB.y,
  };
}

export function getOrthogonalCells(origin: Point): OrthogonalCell[] {
  return [
    { direction: "UP", cell: addPoints(origin, { x: 0, y: -1 }) },
    { direction: "RIGHT", cell: addPoints(origin, { x: 1, y: 0 }) },
    { direction: "DOWN", cell: addPoints(origin, { x: 0, y: 1 }) },
    { direction: "LEFT", cell: addPoints(origin, { x: -1, y: 0 }) },
  ];
}

export function getOrthogonalCellsSafely(
  origin: Point,
  maxWidth: number,
  maxDepth: number,
): OrthogonalCell[] {
  return getOrthogonalCells(origin).filter(
    (orthogonalCell) =>
      orthogonalCell.cell.x >= 0 &&
      orthogonalCell.cell.y >= 0 &&
      orthogonalCell.cell.x < maxWidth &&
      orthogonalCell.cell.y < maxDepth,
  );
}

// This assumes all pipes connect
export function pipeDirection(entrance: Point, pipe: Point[]): Point {
  // console.log("entrance", entrance);
  const connectionPoint = {
    x: oppositeSide(entrance.x),
    y: oppositeSide(entrance.y),
  };
  // console.log("connectionPoint", connectionPoint);
  // console.log("pipe", pipe);
  // console.log(
  //   "pipe.filter((point) => point !== connectionPoint)[0];",
  //   pipe.filter((point) => point !== connectionPoint)[0],
  // );
  return pipe.filter(
    (point) => point.x !== connectionPoint.x || point.y !== connectionPoint.y,
  )[0];
}

// export function calculateStartPipe(startCord: Point): pipe {

// }

export function doesPipeConnect(orthogonalCell: OrthogonalCell): boolean {
  switch (orthogonalCell.direction) {
    case "UP":
      return;
    case "RIGHT":
    case "DOWN":
    case "LEFT":
  }
}
