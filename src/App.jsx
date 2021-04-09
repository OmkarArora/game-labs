import { Routes, Route } from "react-router";
import "./App.css";
import { Guides, Header, Home, Library, NavbarMobile } from "./components";
import { ExplorePlaylist } from "./components/ExplorePlaylist/ExplorePlaylist";

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
        </Routes>
      </main>
      <div className="container-footer">
        <NavbarMobile />
      </div>
    </div>
  );
};
export default App;
