import { Routes, Route } from "react-router";
import "./App.css";
import { Guides, Home, Library, NavbarMobile } from "./components";

const App = () => {
  return (
    <div className="App">
      <div className="container-header">asass</div>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </main>
      <div className="container-footer">
        <NavbarMobile />
      </div>
    </div>
  );
};
export default App;
