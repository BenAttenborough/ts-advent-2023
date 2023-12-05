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
};
