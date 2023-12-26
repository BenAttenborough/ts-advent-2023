import { Direction } from "readline";

type instruction = {
  amount: number;
  start: number;
  end: number;
};

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
  position: number[];
  constructor(content: any, position?: [number, number]) {
    this.content = content;
    this.position = position || [0, 0];
  }

  get(x: number, y: number): any {
    return this.content[y]?.[x];
  }

  getRow(row: number): any[] {
    return this.content[row];
  }

  getCurrent(): any {
    return this.get(this.position[0], this.position[1]);
  }

  set(x: number, y: number, data: any): Grid {
    let newContent = this.content.map((row) => row.slice());
    newContent[y][x] = data;
    return new Grid(newContent, this.position);
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

  private checkPosition(pos: number[]): boolean {
    if (this.getRow(pos[1]) && this.get(pos[0], pos[1])) {
      return true;
    }
    return false;
  }

  setPosition(x: number, y: number) {
    this.position = [y, x];
  }

  move(direction: Grid.Direction) {
    let proposedPosition: number[] = this.position.slice();
    switch (direction) {
      case "UP":
        proposedPosition[1] -= 1;
      case "DOWN":
        proposedPosition[1] += 1;
      case "LEFT":
        proposedPosition[0] -= 1;
      case "RIGHT":
        proposedPosition[0] += 1;
    }
    if (this.checkPosition(proposedPosition)) {
      this.position = proposedPosition;
    }
  }

  findFirst(needle: any): number[] {
    for (let y = 0; y < this.content.length; y++) {
      for (let x = 0; x < this.content[y].length; x++) {
        if (this.content[y][x] === needle) {
          return [x, y];
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

  getOrthogonalValues(x: number, y: number): any[] {
    let values: any = [];
    this.pushIf(values, this.get(x, y - 1));
    this.pushIf(values, this.get(x + 1, y));
    this.pushIf(values, this.get(x, y + 1));
    this.pushIf(values, this.get(x - 1, y));
    return values;
  }

  getOrthogonalValuesFromCurrentPosition(): any[] {
    return this.getOrthogonalValues(...this.position);
  }
}

module Grid {
  export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
}
