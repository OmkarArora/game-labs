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
  Sidenav,
} from "./components";
import { useWindowSize } from "./hooks";

const App = () => {
  const windowWidth = useWindowSize().width;

  return (
    <div className="App">
      <div className="container-header">
        <Header />
      </div>
      {windowWidth >= 768 && <Sidenav />}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:playlistId" element={<ExplorePlaylist />} />
          <Route path="/video/:videoId" element={<ExploreVideo />} />
        </Routes>
      </main>
      {windowWidth < 768 && (
        <div className="container-footer">
          <NavbarMobile />
        </div>
      )}
    </div>
  );
};
export default App;
