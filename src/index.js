import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

const rootEl = document.getElementById("root");

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
)
  rootEl.classList.add("dark_theme");
else rootEl.classList.add("light_theme");

const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
