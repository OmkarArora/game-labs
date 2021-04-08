import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AlertProvider,
  AllVideosProvider,
  CategoryProvider,
  NavProvider,
  PlaylistsProvider,
} from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavProvider>
        <AlertProvider>
          <CategoryProvider>
            <AllVideosProvider>
              <PlaylistsProvider>
                <App />
              </PlaylistsProvider>
            </AllVideosProvider>
          </CategoryProvider>
        </AlertProvider>
      </NavProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
