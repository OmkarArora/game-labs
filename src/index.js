import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { NavProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavProvider>
        <App />
      </NavProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
