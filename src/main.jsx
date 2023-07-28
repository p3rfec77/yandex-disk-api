import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UploadProvider } from "./context/UploadContext.jsx";
import { CounterProvider } from "./context/CounterContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UploadProvider>
      <CounterProvider>
        <App />
      </CounterProvider>
    </UploadProvider>
  </React.StrictMode>
);
