export const Day02 = {
  partOne: (input: string): number => {
    const result = input
      .split("\n")
      .map(parseLine)
      .reduce((prev, next, idx) => {
        if (next.some((x) => !x)) {
          return prev;
        } else {
          return prev + idx + 1;
        }
      }, 0);
    return result;
  },
  partTwo: (input: string): number => {
    const result = input
      .split("\n")
      .map(parseLinePartTwo)
      .map((cubes) => {
        let r: number;
        let g: number;
        let b: number;
        r = g = b = 0;
        cubes.forEach((x) => {
          r = Math.max(x.r, r);
          g = Math.max(x.g, g);
          b = Math.max(x.b, b);
        });
        return r * g * b;
      })
      .reduce((prev, next) => prev + next);
    return result;
  },
};

type CubeSet = {
  r: number;
  g: number;
  b: number;
};

const limits: CubeSet = {
  r: 12,
  g: 13,
  b: 14,
};

function parseLine(input: string): boolean[] {
  const sepratorIndex = input.indexOf(":");
  return input
    .slice(sepratorIndex + 2)
    .split("; ")
    .map(convertToCubeSet)
    .map((cubes, idx) => {
      return isValidSet(cubes);
    });
}

function isValidSet(cubeSet: CubeSet): boolean {
  return (
    cubeSet.r <= limits.r && cubeSet.g <= limits.g && cubeSet.b <= limits.b
  );
}

function convertToCubeSet(input: string): CubeSet {
  let r, g, b;
  r = g = b = 0;
  const result = input.split(", ").forEach((cube) => {
    const amount = Number(cube.split(" ")[0]);
    const color = cube.split(" ")[1];
    switch (color) {
      case "red":
        r = amount;
        break;
      case "green":
        g = amount;
        break;
      case "blue":
        b = amount;
    }
  });
  return {
    r: r,
    g: g,
    b: b,
  };
}

function parseLinePartTwo(input: string): CubeSet[] {
  const sepratorIndex = input.indexOf(":");
  return input
    .slice(sepratorIndex + 2)
    .split("; ")
    .map(convertToCubeSet);

  // .map((cubes, idx) => {
  //   return isValidSet(cubes);
  // });
}
