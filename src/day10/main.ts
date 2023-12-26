import { Grid } from "../helpers/utils.ts";

function dirs(up: any, right: any, down: any, left: any): Directions {
  return { up, right, down, left };
}

export const Day10 = {
  partOne: (input: string): number => {
    const grid = new Grid(input.split("\n").map((x) => x.split("")));
    grid.setPosition(...grid.findFirst("S"));
    console.log(grid);
    const convertedGrid = grid.map((cell) => pipes.get(cell));
    console.log(convertedGrid);
    const neighbouringCells =
      convertedGrid.getOrthogonalValuesFromCurrentPosition();
    //   .map((cell) => pipes.get(cell));
    console.log("dirs", dirs(...neighbouringCells));
    const startingPipe = getCompatiblePipes(dirs(...neighbouringCells));
    console.log("startingPipe", startingPipe);
    const startX = convertedGrid.position[0];
    const startY = convertedGrid.position[1];
    let count = 0;
    traverse(startingPipe[0], convertedGrid);
    // do {

    // } while ()
    return 0;
  },

  partTwo: (input: string): number => {
    return 0;
  },
};

function traverse(direction: Direction, grid: Grid) {
  console.log(grid.position);
  grid.move(direction);
  const pipe = grid.getCurrent();
  console.log(pipe);
  const outputDirection = pipe.outputs.filter(
    (dir) => dir !== oppositeDirection(direction),
  );
  console.log(
    `Moving ${direction} into position ${grid.position} which is pipe ${pipe.inputs}, output direction is ${outputDirection}`,
  );
  return outputDirection;
}

function oppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case "UP":
      return "DOWN";
    case "DOWN":
      return "UP";
    case "LEFT":
      return "RIGHT";
    case "RIGHT":
      return "LEFT";
  }
}

// export function getConnectingPipe(directions: [Direction, Direction]) {
//   let sortedDirections = directions.slice();
//   sortedDirections.sort();
//   if (sortedDirections[0] === "DOWN") {
//     if (sortedDirections[1] === "LEFT") {
//       return "7"
//     }
//   }
// }

export function getCompatiblePipes(pipes: Directions): Direction[] {
  let compatibleDirections: Direction[] = [];
  if (pipes.up.inputs.length && pipes.up.inputs.includes("UP")) {
    compatibleDirections.push("UP");
  }
  if (pipes.down.inputs.length && pipes.down.inputs.includes("DOWN")) {
    compatibleDirections.push("DOWN");
  }
  if (pipes.left.inputs.length && pipes.left.inputs.includes("LEFT")) {
    compatibleDirections.push("LEFT");
  }
  if (pipes.right.inputs.length && pipes.right.inputs.includes("RIGHT")) {
    compatibleDirections.push("RIGHT");
  }
  if (compatibleDirections.length !== 2) {
    throw new Error(
      `Pipe does not connect to 2 others, connects to ${compatibleDirections.length}`,
    );
  }
  return compatibleDirections;
}

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
type Directions = {
  up: PipeIO;
  down: PipeIO;
  right: PipeIO;
  left: PipeIO;
};

type OrthogonalCell = {
  direction: Direction;
  cell: Point;
};

type Pipe = "|" | "-" | "L" | "J" | "7" | "F" | ".";

type PipeIO = {
  inputs: [Direction, Direction] | [];
  outputs: [Direction, Direction] | [];
};

export const pipes = new Map<Pipe, PipeIO>([
  [
    "|",
    {
      inputs: ["DOWN", "UP"],
      outputs: ["DOWN", "UP"],
    },
  ],

  [
    "-",
    {
      inputs: ["LEFT", "RIGHT"],
      outputs: ["LEFT", "RIGHT"],
    },
  ],
  [
    "L",
    {
      inputs: ["DOWN", "LEFT"],
      outputs: ["UP", "RIGHT"],
    },
  ],
  [
    "J",
    {
      inputs: ["DOWN", "RIGHT"],
      outputs: ["LEFT", "UP"],
    },
  ],
  [
    "7",
    {
      inputs: ["UP", "RIGHT"],
      outputs: ["DOWN", "LEFT"],
    },
  ],
  [
    "F",
    {
      inputs: ["UP", "LEFT"],
      outputs: ["DOWN", "RIGHT"],
    },
  ],
  [
    ".",
    {
      inputs: [],
      outputs: [],
    },
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
