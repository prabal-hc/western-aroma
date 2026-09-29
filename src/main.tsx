import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SmoothScroll } from "./components/motion";
import "./styles/globals.css";

// The intro and hero parallax assume a load at the top of the page; don't let
// the browser restore a previous scroll position on reload.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
);
