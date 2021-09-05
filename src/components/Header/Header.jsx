import { Avatar } from "shoto-ui";
import Logo from "../../images/logo/chemical.svg";
import { useAuth } from "../../contexts";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  const { isUserLoggedIn } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="link-logo">
        <div className="logo">
            <img src={Logo} alt="game labs" />
            <span>Game LABS</span>
        </div>
      </Link>
      <div className="container-avatar-user">
        {isUserLoggedIn && (
          <Link to="/user-profile">
            <Avatar
              alt="tanjiro"
              src="https://64.media.tumblr.com/453021cb82f2d79140d92f617c01d98c/4c4becca07962d76-f7/s640x960/f3972fcb52c4f816c9892c0802dec002cb36b842.jpg"
              height="1.6rem"
              width="1.6rem"
            />
          </Link>
        )}
        {!isUserLoggedIn && <Link to="/login" className="link-login">LOGIN</Link>}
      </div>
    </header>
  );
};
