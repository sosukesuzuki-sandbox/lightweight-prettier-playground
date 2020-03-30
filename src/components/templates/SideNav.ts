import { h, FunctionComponent } from "preact";
import { gray } from "../../lib/colors";

const style = {
  width: "200px",
  backgroundColor: gray[0],
  height: "100%",
};

const SideNav: FunctionComponent = () => {
  return h("div", { style });
};

export default SideNav;
