import Loader from "@/components/@core/Loader";
import { useSession } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { session, isLoaded } = useSession();
  const navigate = useNavigate();

  if (isLoaded) {
    return <Loader />; // Show a loading state while the session is being fetched
  }

  if (!session) {
    navigate("/login"); // Redirect to login page if not authenticated
  }

  return children;
};

export default PrivateRoute;
