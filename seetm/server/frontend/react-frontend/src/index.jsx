import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("reactFrontendContainer")
);
root.render(
  <React.StrictMode>
    <App
      notify={false}
      appTheme={window.appTheme.toString().toLowerCase() || "dark"}
      appEnv={window.appEnv.toString().toLowerCase() || "prod"}
      appSinhala={Boolean(window.appSinhala) || true}
      appVersion={window.appVersion || "N/A"}
    />
  </React.StrictMode>
);
