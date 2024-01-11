import { setupWorker } from "msw/browser";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { handlers } from "./mocks/handlers";

const worker = setupWorker(...handlers);
await worker.start({ onUnhandledRequest: "bypass" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
