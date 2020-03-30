import { h, render } from "preact";

render(
  h("a", { href: "/" }, "Hello, lightweight-prettier-playground"),
  document.querySelector(".root")!
);
