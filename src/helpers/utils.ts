export const Utils = {
  lines: (input: string): string[] => {
    return input.split("\n");
  },

  stringDivideInto: (input: string, divisor: number): string[] => {
    let loopCount = Math.floor(input.length / divisor);
    let container = [];
    for (let i = 0; i < loopCount; ++i) {
      container.push(input.slice(divisor * i, divisor * (i + 1)));
    }
    return container;
  },

  arrayDivideInto: (input: any[], divisor: number): any[] => {
    let loopCount = Math.floor(input.length / divisor);
    let container = [];
    for (let i = 0; i < loopCount; ++i) {
      container.push(input.splice(0, divisor));
    }
    return container;
  },

  arrayDivideInto2: (input: any[], divisor: number): any[] => {
    let loopCount = Math.floor(input.length / divisor);
    let container = [];
    for (let i = 0; i < loopCount; ++i) {
      container.push(input.splice(0, divisor));
    }
    if (input.length) {
      container.push(input);
    }
    return container;
  },

  // Takes two sets and returns elements common to both (in an array)
  arrayGetCommonElements: <Type>(set1: Set<Type>, set2: Set<Type>): Type[] => {
    let commonElements: Type[] = [];
    set1.forEach((item) => {
      if (set2.has(item)) {
        commonElements.push(item);
      }
    });
    return commonElements;
  },

  matrixRotateClockwise: <Type>(input: Type[][]): Type[][] => {
    input.reverse();
    let container: any[] = [];
    for (let i = 0; i < input[0].length; ++i) {
      container.push([]);
      for (let j = 0; j < input.length; ++j) {
        container[i].push(input[j][i]);
      }
    }
    return container;
  },

  range(start: number, end: number): number[] {
    let arr: number[] = [];
    if (start > end) {
      return [];
    } else {
      for (let i = start; i <= end; ++i) {
        arr.push(i);
      }
    }
    return arr;
  },

  everyValueTheSame(arr: any[]): boolean {
    if (arr.length < 2) {
      return true;
    }

    const firstItem = arr[0];
    return arr.every((x) => x === firstItem);
  },
};

export class Grid {
  content: any[][];
  position: Grid.Point;
  constructor(content: any, position?: Grid.Point) {
    this.content = content;
    this.position = position || [0, 0];
  }

  get([x, y]: Grid.Point): any {
    return this.content[y]?.[x];
  }

  getRow(row: number): any[] {
    return this.content[row];
  }

  getCurrent(): any {
    return this.get(this.position);
  }

  set([x, y]: Grid.Point, data: any) {
    this.content[y][x] = data;
  }

  map(func: (x: any) => any[][]): Grid {
    const newContent = this.content.map((row) => row.map(func));
    return new Grid(newContent, this.position);
  }

  forEach(func: (value: any, x?: number, y?: number) => void) {
    this.content.forEach((row, rowIdx) => {
      row.forEach((value, colIdx) => {
        func(value, colIdx, rowIdx);
      });
    });
  }

  reduce(
    rowReducer: (arr: any[]) => any,
    gridReducer: (grid: any[]) => any,
  ): any {
    return this.content
      .map((row) => rowReducer(row))
      .map((values) => gridReducer(values));
  }

  private checkPosition(pos: Grid.Point): boolean {
    if (this.getRow(pos[1]) && this.get(pos)) {
      return true;
    }
    return false;
  }

  setPosition([x, y]: Grid.Point) {
    this.position = [y, x];
  }

  move(direction: Grid.Direction) {
    let proposedPosition: Grid.Point = [...this.position];
    switch (direction) {
      case "UP":
        proposedPosition[1] -= 1;
        break;
      case "DOWN":
        proposedPosition[1] += 1;
        break;
      case "LEFT":
        proposedPosition[0] -= 1;
        break;
      case "RIGHT":
        proposedPosition[0] += 1;
        break;
    }

    if (this.checkPosition(proposedPosition)) {
      this.position = proposedPosition;
    }
  }

  findFirst(needle: any): Grid.Point {
    for (let y = 0; y < this.content.length; y++) {
      for (let x = 0; x < this.content[y].length; x++) {
        if (this.content[y][x] === needle) {
          return [y, x];
        }
      }
    }
    throw new Error(`${needle} does not exist in grid`);
  }

  pushIf(arr: any[], value: any) {
    if (value !== undefined) {
      arr.push(value);
    }
  }

  getOrthogonalValues([x, y]: Grid.Point): any[] {
    let values: any = [];
    this.pushIf(values, this.get([x, y - 1]));
    this.pushIf(values, this.get([x + 1, y]));
    this.pushIf(values, this.get([x, y + 1]));
    this.pushIf(values, this.get([x - 1, y]));

    // values.push(this.get([x + 1, y]));
    // values.push(this.get([x, y - 1]));
    // values.push(this.get([x, y + 1]));
    // values.push(this.get([x - 1, y]));

    return values;
  }

  getOrthogonalValuesFromCurrentPosition(): any[] {
    return this.getOrthogonalValues(this.position);
  }
}

module Grid {
  export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
  export type Point = [number, number];
}
