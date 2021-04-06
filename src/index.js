import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AllVideosProvider, NavProvider, PlaylistsProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavProvider>
        <AllVideosProvider>
          <PlaylistsProvider>
            <App />
          </PlaylistsProvider>
        </AllVideosProvider>
      </NavProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
