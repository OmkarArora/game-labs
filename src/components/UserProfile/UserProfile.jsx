import { useAuth } from "../../contexts";
import "./userProfile.css";

export const UserProfile = () => {
  const { isUserLoggedIn, logoutUser } = useAuth();

  const logoutHandler = () => {
    // if(localStorage?.getItem("noUserCart")){
    //   cartDispatch({ type: "SET_CART", payload: JSON.parse(localStorage.getItem("noUserCart")) });
    // }else{
    //   cartDispatch({ type: "SET_CART", payload: [] });
    // }
    // wishlistDispatch({ type: "SET_WISHLIST", payload: [] });
    logoutUser();
  };

  return (
    <div className="">
      <div className="container-userProfile">
        Profile
        <br />
        {isUserLoggedIn && <button onClick={logoutHandler}>Log out</button>}
      </div>
    </div>
  );
};
