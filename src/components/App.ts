import { h, FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import TopNav from "./templates/TopNav";
import { useWorker } from "../lib/contexts/WorkerContext";

const App: FunctionComponent = () => {
  const { format } = useWorker();
  useEffect(() => {
    format("const foo = '3'", {}).then((f) => console.log(f));
  }, []);
  return h("div", null, [h(TopNav, null)]);
};

export default App;
