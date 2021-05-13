import { Routes, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";
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
  Login,
  SignUp,
  UserProfile,
} from "./components";

const App = () => {
  return (
    <div className="App">
      <div className="container-header">
        <Header />
      </div>
      <div className="container-sidenav">
        <Sidenav />
      </div>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <PrivateRoute path="/guides" element={<Guides />} />
          <PrivateRoute path="/library" element={<Library />} />
          <Route path="/playlist/:playlistId" element={<ExplorePlaylist />} />
          <Route path="/video/:videoId" element={<ExploreVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </main>
      <div className="container-footer">
        <NavbarMobile />
      </div>
    </div>
  );
};
export default App;
