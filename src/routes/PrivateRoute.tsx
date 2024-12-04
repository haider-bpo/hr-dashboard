import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  // const isAuthenticated = Boolean(localStorage.getItem("token"));s
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
