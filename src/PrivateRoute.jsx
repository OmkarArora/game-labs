import { Route, Navigate } from "react-router-dom";

import { useAuth } from "./contexts";

function PrivateRoute({ path, ...props }) {
  const { isUserLoggedIn } = useAuth();

  return isUserLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}

export default PrivateRoute;
