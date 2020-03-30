import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useWorker } from "../../lib/contexts/WorkerContext";
import { gray } from "../../lib/colors";

const style = {
  display: "flex",
  width: "100%",
  height: "100%",
  position: "relative",
};
const textareaStyle = {
  width: "50%",
  backgroundColor: gray[9],
  color: gray[0],
};
const errorMsgStyle = {
  backgroundColor: gray[3],
  color: gray[9],
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
  padding: "30px",
  whiteSpace: "pre-wrap",
};

const Playground: FunctionComponent = () => {
  const [value, setValue] = useState("");
  const [formatted, setFormatted] = useState(value);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { format } = useWorker();

  useEffect(() => {
    (async () => {
      try {
        setFormatted(await format(value, {}));
        if (errorMsg) {
          setErrorMsg(null);
        }
      } catch (error) {
        setErrorMsg(error.message);
      }
    })();
  }, [value, setFormatted, setErrorMsg, errorMsg]);

  return h("div", { style }, [
    h("textarea", {
      style: textareaStyle,
      value,
      onInput: (e: any) => {
        setValue(e.target.value);
      },
    }),
    h("textarea", { style: textareaStyle, value: formatted, readOnly: true }),
    errorMsg && h("div", { style: errorMsgStyle }, errorMsg),
  ]);
};

export default Playground;
