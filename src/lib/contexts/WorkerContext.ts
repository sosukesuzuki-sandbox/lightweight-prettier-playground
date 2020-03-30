import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { WorkerAPI } from "../worker/WorkerAPI";

const WorkerContext = createContext<WorkerAPI>(null as any);
export const WorkerProvider = WorkerContext.Provider;
export const useWorker = () => useContext(WorkerContext);
