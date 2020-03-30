import { h, FunctionComponent } from "preact";

type Props = {
  href: string;
};

const Anchor: FunctionComponent<Props> = ({ href, children }) => {
  return h(
    "a",
    { href, target: "_blank", rel: "noopener noreferrer" },
    children
  );
};

export default Anchor;
