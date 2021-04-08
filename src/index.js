import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AlertProvider, AllVideosProvider, NavProvider, PlaylistsProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavProvider>
        <AlertProvider>
        <AllVideosProvider>
          <PlaylistsProvider>
            <App />
          </PlaylistsProvider>
        </AllVideosProvider>
        </AlertProvider>
      </NavProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
