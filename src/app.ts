import { readFile } from "./helpers/io.js";
import { Day01 } from "./day01/main.js";
import { Day02 } from "./day02/main.js";
import { Day03 } from "./day03/main.js";
// import * as url from "url";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

let result = readFile(__dirname + "/day03/", "input.txt");
result.then(
  (data) => {
    console.log(Day03.partTwo(data));
  },
  (err) => {
    console.log(err);
  },
);
