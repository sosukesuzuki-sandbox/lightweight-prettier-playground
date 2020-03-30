import { expose } from "comlink";
import type { Options } from "prettier";
import { format, importSpecificParser } from "./prettier";

export class WorkerAPI {
  format(value: string, options: Options): Promise<string> {
    return format(value, options);
  }
  importSpecificParser(parser: string): Promise<void> {
    return importSpecificParser(parser);
  }
}

expose(WorkerAPI);
