import { open } from "node:fs/promises";
import * as path from "path";

export type result = {
  isSuccess: boolean;
  value: string;
  error: string | null;
};

// Remove and use getInput instead
const readFile = async (dir: string, file: string): Promise<string> => {
  let filehandle = await open(path.join(dir, file), "r");
  let data = await filehandle.readFile("utf8");
  filehandle.close();
  return data;
};

export function getInput(directory: string, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let readRead = readFile(directory + "/", fileName);
    readRead.then(
      (data: string) => {
        resolve(data);
      },
      (err: string) => {
        reject(err);
      },
    );
  });
}

export function success(value: string): result {
  return {
    isSuccess: true,
    value: value,
    error: "",
  };
}

export function failure(error: unknown): result {
  let message;
  if (error instanceof Error) message = error.message;
  else message = String(error);
  return {
    isSuccess: false,
    value: "",
    error: message,
  };
}
