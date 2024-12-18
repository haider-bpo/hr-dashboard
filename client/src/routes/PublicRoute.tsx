import { useIsAuthenticated } from "@/features/auth/authSelectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to home page if authenticated
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? children : null; // Prevent children from rendering during redirect
};

export default PublicRoute;
