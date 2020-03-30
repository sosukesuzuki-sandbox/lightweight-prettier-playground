import { h, FunctionComponent } from "preact";
import { gray } from "../../lib/colors";

type Props = {
  href: string;
};

const style = { color: gray[8], fontWeight: "bold", textDecoration: "none" };

const Anchor: FunctionComponent<Props> = ({ href, children }) => {
  return h(
    "a",
    { style, href, target: "_blank", rel: "noopener noreferrer" },
    children
  );
};

export default Anchor;
