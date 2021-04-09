import { Routes, Route } from "react-router";
import "./App.css";
import {
  Guides,
  Header,
  Home,
  Library,
  NavbarMobile,
  ExplorePlaylist,
  ExploreVideo,
} from "./components";

const App = () => {
  return (
    <div className="App">
      <div className="container-header">
        <Header />
      </div>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:playlistId" element={<ExplorePlaylist />} />
          <Route path="/video/:videoId" element={<ExploreVideo />} />
        </Routes>
      </main>
      <div className="container-footer">
        <NavbarMobile />
      </div>
    </div>
  );
};
export default App;
