import { FC } from "react";
import { createRoot, Root } from "react-dom/client";
import { CacheProvider, css, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
import resetCss from "./reset.css?inline";

const SampleElement: FC = () => {
  return (
    <>
      <h1
        css={css`
          color: red;
        `}
      >
        Hello, world!
      </h1>
      <ul>
        <li>test</li>
      </ul>
      <a href="#">link</a>
    </>
  );
};

class SampleElementComponent extends HTMLElement {
  root: Root;
  cache: EmotionCache;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.root = createRoot(this.shadowRoot!);
    this.cache = createCache({
      key: "sample-element",
      container: this.shadowRoot!,
    });
    this.setResetCss();
  }

  setResetCss() {
    const style = document.createElement("style");
    style.innerHTML = resetCss;
    this.shadowRoot!.appendChild(style);
  }

  connectedCallback() {
    this.root.render(
      <CacheProvider value={this.cache}>
        <SampleElement />
      </CacheProvider>
    );
  }
}

customElements.define("sample-element", SampleElementComponent);
