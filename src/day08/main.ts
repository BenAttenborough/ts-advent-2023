export const Day08 = {
  partOne: (input: string): number => {
    const startLocation = "AAA";
    const endLocation = "ZZZ";
    console.log(input);
    const directions = input.split("\n\n")[0].split("");
    console.log(directions);
    const puzzleMap = new Map<string, PuzzleMapValues>();
    input
      .split("\n\n")[1]
      .split("\n")
      .forEach((line) => {
        let key = line.split(" ")[0];
        let value = {
          left: line
            .split(" ")[2]
            .split("")
            .filter((char) => char !== "(" && char !== ",")
            .join(""),
          right: line
            .split(" ")[3]
            .split("")
            .filter((char) => char !== ")")
            .join(""),
        };
        puzzleMap.set(key, value);
      });
    console.log(puzzleMap);
    let counter = 0;

    counter = runDirections(directions, puzzleMap, startLocation, endLocation);
    console.log("counter", counter);

    return 0;
  },

  partTwo: (input: string): number => {
    const directions = input.split("\n\n")[0].split("");
    console.log(directions);
    const puzzleMap = new Map<string, PuzzleMapValues>();
    input
      .split("\n\n")[1]
      .split("\n")
      .forEach((line) => {
        let key = line.split(" ")[0];
        let value = {
          left: line
            .split(" ")[2]
            .split("")
            .filter((char) => char !== "(" && char !== ",")
            .join(""),
          right: line
            .split(" ")[3]
            .split("")
            .filter((char) => char !== ")")
            .join(""),
        };
        puzzleMap.set(key, value);
      });
    // console.log(puzzleMap);

    const puzzleMapStartNodes = new Map<string, PuzzleMapValues>();
    input
      .split("\n\n")[1]
      .split("\n")
      .filter((line) => line[2] === "A")
      .forEach((line) => {
        let key = line.split(" ")[0];
        let value = {
          left: line
            .split(" ")[2]
            .split("")
            .filter((char) => char !== "(" && char !== ",")
            .join(""),
          right: line
            .split(" ")[3]
            .split("")
            .filter((char) => char !== ")")
            .join(""),
        };
        puzzleMapStartNodes.set(key, value);
      });
    console.log(puzzleMapStartNodes);

    for (let i = 0; i < puzzleMapStartNodes.size; i++) {}

    return 0;
  },
};

type PuzzleMapValues = {
  left: string;
  right: string;
};

type PuzzleMap = Map<string, PuzzleMapValues>;

function runDirections(
  directions: string[],
  puzzleMap: PuzzleMap,
  startLocation: string,
  endLocation: string,
): number {
  let found = false;
  let count = 0;

  while (!found && count < 100000) {
    const direction = getNextItemLoop(directions, count);

    count++;

    if (direction === "L") {
      startLocation = puzzleMap.get(startLocation).left;
    } else {
      startLocation = puzzleMap.get(startLocation).right;
    }
    if (startLocation === endLocation) {
      found = true;
    }
  }

  return count;
}

// Following implementation can blow out the stack

export function runDirectionsRecursive(
  directions: string[],
  puzzleMap: PuzzleMap,
  startLocation: string,
  endLocation: string,
  count: number,
): number {
  const direction = getNextItemLoop(directions, count);
  let location = startLocation;

  count++;

  if (direction === "L") {
    location = puzzleMap.get(location).left;
    if (location === endLocation) {
      return count;
    }
  } else {
    location = puzzleMap.get(location).right;
    if (location === endLocation) {
      return count;
    }
  }
  if (count - 1 > 1000) {
    return -1;
  }
  return runDirections(directions, puzzleMap, location, endLocation, count);
}

function getNextItemLoop(arr: string[], idx: number): string {
  return arr[idx % arr.length];
}
