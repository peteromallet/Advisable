import "../src/tailwind.css";
import "./toby.css";

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.id = "AppRoot";
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
});
