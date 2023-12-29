import { Grid } from "../helpers/utils.ts";

function dirs([up, right, down, left]: [any, any, any, any]): Directions {
  if (up === undefined) {
    up = { inputs: [], outputs: [] };
  }
  if (right === undefined) {
    right = { inputs: [], outputs: [] };
  }
  if (down === undefined) {
    down = { inputs: [], outputs: [] };
  }
  if (left === undefined) {
    left = { inputs: [], outputs: [] };
  }
  return { up, right, down, left };
}

export const Day10 = {
  partOne: (input: string): number => {
    const grid = new Grid(input.split("\n").map((x) => x.split("")));
    grid.setPosition(grid.findFirst("S"));
    const convertedGrid = grid.map((cell) => pipes.get(cell));
    const neighbouringCells =
      convertedGrid.getOrthogonalValuesFromCurrentPosition();
    const startingPipe = getCompatiblePipes(dirs(neighbouringCells));
    const replacementPipie = {
      inputs: [
        oppositeDirection(startingPipe[0]),
        oppositeDirection(startingPipe[1]),
      ].sort(),
      outputs: startingPipe,
    };
    convertedGrid.set(convertedGrid.position, replacementPipie);
    let count = 0;
    let direction = startingPipe[0];
    const startX = convertedGrid.position[0];
    const startY = convertedGrid.position[1];
    do {
      count++;
      direction = traverse(direction, convertedGrid);
    } while (
      !(
        convertedGrid.position[0] == startX &&
        convertedGrid.position[1] == startY
      )
    );
    return count / 2;
  },

  partTwo: (input: string): number => {
    return 0;
  },
};

function traverse(direction: Direction, grid: Grid) {
  grid.move(direction);
  const pipe = grid.getCurrent();
  return getOutput(pipe, direction);
}

export function getOutput(pipe: PipeIO, direction: Direction): Direction {
  const result = pipe.outputs.filter(
    (dir) => dir !== oppositeDirection(direction),
  );
  if (result.length !== 1) {
    throw new Error(
      `Pipe with outputs ${pipe.outputs} is not compatible with an input of ${direction}`,
    );
  } else {
    return result[0];
  }
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
  const connectionPoint = {
    x: oppositeSide(entrance.x),
    y: oppositeSide(entrance.y),
  };
  return pipe.filter(
    (point) => point.x !== connectionPoint.x || point.y !== connectionPoint.y,
  )[0];
}
