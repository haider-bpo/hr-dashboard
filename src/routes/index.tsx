import { lazy, useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/components/layout/dashboard-layout";
import JobsPage from "@/pages/jobs";

const ApplicantsPage = lazy(() => import("@/pages/applicants"));
const JobCreationPage = lazy(
  () => import("@/pages/jobs/_components/job-creation-page")
);
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
            <JobsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "jobs/:jobId",
        element: (
          <PrivateRoute>
            <JobCreationPage />
          </PrivateRoute>
        ),
      },
      {
        path: "applicants",
        element: (
          <PrivateRoute>
            <ApplicantsPage />
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
