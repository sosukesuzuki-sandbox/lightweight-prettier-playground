import { expose } from "comlink";

export class WorkerAPI {
  format(value: string): Promise<string> {
    return Promise.resolve(`-------${value}-------`);
  }
}

expose(WorkerAPI);
