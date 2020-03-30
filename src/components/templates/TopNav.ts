import { h, FunctionComponent } from "preact";
import Typography from "../atoms/Typography";
import Anchor from "../atoms/Anchor";
import { gray } from "../../lib/colors";

const TopNav: FunctionComponent = () => {
  return h(
    "nav",
    {
      style: {
        borderBottom: `1px solid ${gray[5]}`,
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        justifyContent: "space-between",
      },
    },
    [
      h(
        Typography,
        { size: "large", weight: "bold" },
        "Lightweight Prettier Playground"
      ),
      h(Anchor, { href: "https://github.com/sosukesuzuki" }, "GitHub"),
    ]
  );
};

export default TopNav;
