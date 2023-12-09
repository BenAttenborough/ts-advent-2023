import { Utils } from "./utils.ts";

test("lines", () => {
  expect(Utils.lines("abc\ndef")).toEqual(["abc", "def"]);
});

test("arrayDivideInto", () => {
  expect(Utils.arrayDivideInto([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
});

test("arrayGetCommonElements", () => {
  const set1 = new Set(["a", "b", "c"]);
  const set2 = new Set(["d", "b", "e"]);

  expect(Utils.arrayGetCommonElements(set1, set2)).toEqual(["b"]);
});

test("matrixTransform 1", () => {
  let input = [
    [4, 5, 6],
    [1, 2, 3],
  ];
  expect(Utils.matrixRotateClockwise(input)).toEqual([
    [1, 4],
    [2, 5],
    [3, 6],
  ]);
});

test("matrixTransform 2", () => {
  let input = [
    ["0", "D", "0"],
    ["N", "C", "0"],
    ["Z", "M", "P"],
  ];
  expect(Utils.matrixRotateClockwise(input)).toEqual([
    ["Z", "N", "0"],
    ["M", "C", "D"],
    ["P", "0", "0"],
  ]);
});

test("matrixTransform 3", () => {
  let input = [
    [1, 4],
    [2, 5],
    [3, 6],
  ];
  expect(Utils.matrixRotateClockwise(input)).toEqual([
    [3, 2, 1],
    [6, 5, 4],
  ]);
});

test("stringDivideInto", () => {
  expect(Utils.stringDivideInto("123456789", 3)).toEqual(["123", "456", "789"]);
});

test("stringDivideInto test 2", () => {
  expect(Utils.stringDivideInto("[Z] [M] [P] ", 4)).toEqual([
    "[Z] ",
    "[M] ",
    "[P] ",
  ]);
});

test("everyValueTheSame", () => {
  expect(Utils.everyValueTheSame([3, 3, 3, 3, 3])).toEqual(true);
  expect(Utils.everyValueTheSame([3, 3, "3", 3, 3])).toEqual(false);
});
