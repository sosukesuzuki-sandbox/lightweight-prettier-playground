import { h, FunctionComponent } from "preact";
import Typography from "../atoms/Typography";
import Anchor from "../atoms/Anchor";

const TopNav: FunctionComponent = () => {
  return h(
    "nav",
    {
      style: {
        backgroundColor: "gray",
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
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
