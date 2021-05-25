import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AlertProvider,
  AllVideosProvider,
  AuthProvider,
  CategoryProvider,
  NavProvider,
  PlaylistsProvider,
} from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
