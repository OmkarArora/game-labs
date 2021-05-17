import {
  RiGamepadFill,
  RiGamepadLine,
  RiHome5Fill,
  RiHome5Line,
  RiGameLine,
  RiGameFill
} from "react-icons/ri";
import { BsCollectionPlayFill, BsCollectionPlay } from "react-icons/bs";
import "./navbarMobile.css";
import { Link } from "react-router-dom";
import { useNav } from "../../contexts";

export const NavbarMobile = () => {
  const { activeNavLink } = useNav();
  return (
    <div className="navbar-mobile">
      <Link to="/">
        <div className="btn-nav btn-nav-home">
          <div className="icon icon-home">
            {activeNavLink === "home" ? <RiHome5Fill /> : <RiHome5Line />}
          </div>
          <div className="heading">Home</div>
        </div>
      </Link>

      <Link to="/all-games">
        <div className="btn-nav btn-nav-guides">
          <div className="icon icon-gamepad">
            {activeNavLink === "all-games" ? <RiGameFill /> : <RiGameLine />}
          </div>
          <div className="heading">Games</div>
        </div>
      </Link>

      <Link to="/guides">
        <div className="btn-nav btn-nav-guides">
          <div className="icon icon-gamepad">
            {activeNavLink === "guides" ? <RiGamepadFill /> : <RiGamepadLine />}
          </div>
          <div className="heading">Guides</div>
        </div>
      </Link>

      <Link to="/library">
        <div className="btn-nav btn-nav-library">
          <div className="icon icon-library btn-nav">
            {activeNavLink === "library" ? (
              <BsCollectionPlayFill />
            ) : (
              <BsCollectionPlay />
            )}
          </div>
          <div className="heading">Library</div>
        </div>
      </Link>
    </div>
  );
};
