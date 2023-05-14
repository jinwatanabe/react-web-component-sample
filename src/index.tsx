import { FC } from "react";
import { createRoot, Root } from "react-dom/client";

const SampleElement: FC = () => {
  return <div>Hello, world!</div>;
};

class SampleElementComponent extends HTMLElement {
  root: Root;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.root = createRoot(this.shadowRoot!);
  }

  connectedCallback() {
    this.root.render(<SampleElement />);
  }
}

customElements.define("sample-element", SampleElementComponent);
