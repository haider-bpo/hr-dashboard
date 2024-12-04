import { lazy, useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/components/layout/dashboard-layout";

const Jobs = lazy(() => import("../pages/jobs"));
const Applicants = lazy(() => import("../pages/applicants"));
const NotFound = lazy(() => import("../pages/not-found"));

const routes: RouteObject[] = [
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <RedirectOnLoad />,
      },
      {
        path: "jobs",
        element: (
          <PrivateRoute>
            <Jobs />
          </PrivateRoute>
        ),
      },
      {
        path: "applicants",
        element: (
          <PrivateRoute>
            <Applicants />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

function RedirectOnLoad() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to jobs page as soon as the app loads if authenticated
    navigate("/jobs");
  }, []);

  return null; // This component doesn't render anything
}

export default routes;
