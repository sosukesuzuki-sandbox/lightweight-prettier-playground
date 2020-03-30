import { h, FunctionComponent } from "preact";

type Size = "small" | "middle" | "large";
type Props = {
  size: Size;
  weight: "normal" | "bold";
};

const sizeMap: Map<Size, string> = new Map([
  ["small", "14px"],
  ["middle", "18px"],
  ["large", "25px"],
]);

const Typography: FunctionComponent<Props> = ({ size, weight, children }) => {
  return h(
    "p",
    {
      style: { margin: "0", fontWeight: weight, fontSize: sizeMap.get(size)! },
    },
    children
  );
};

export default Typography;
