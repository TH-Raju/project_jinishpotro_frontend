import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShareContextData from "./Context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShareContextData>
      <App />
    </ShareContextData>
  </React.StrictMode>
);
