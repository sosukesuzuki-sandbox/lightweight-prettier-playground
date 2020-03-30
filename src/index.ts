import { h, render } from "preact";
import App from "./components/App";
import WorkerProxy from "./WorkerProxy";
import { WorkerProvider } from "./lib/contexts/WorkerContext";
import { WorkerAPI } from "./lib/worker/WorkerAPI";

async function main() {
  const proxy = (await new (WorkerProxy as any)()) as WorkerAPI;
  render(
    h(WorkerProvider, { value: proxy, children: h(App, null) }),
    document.querySelector(".root")!
  );
}

main();
