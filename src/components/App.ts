import { h, FunctionComponent } from "preact";
import TopNav from "./templates/TopNav";

const App: FunctionComponent = () => {
  return h("div", null, [h(TopNav, null)]);
};

export default App;
