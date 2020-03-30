import { h, FunctionComponent } from "preact";
import TopNav from "./templates/TopNav";
// import SideNav from "./templates/SideNav";
import Playground from "./templates/Playground";

const App: FunctionComponent = () => {
  return h("div", null, [
    h(TopNav, null),
    h(
      "div",
      {
        style: {
          display: "flex",
          height: "calc(100vh - 60px)",
        },
      },
      [, /* h(SideNav, null) */ h(Playground, null)]
    ),
  ]);
};

export default App;
