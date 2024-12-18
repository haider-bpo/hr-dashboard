import { lazy, useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/dashboard-layout";
import JobsPage from "@/pages/jobs";
import SignInPage from "@/pages/auth/sign-in";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const ApplicantsPage = lazy(() => import("@/pages/applicants"));
const JobCreationPage = lazy(
  () => import("@/pages/jobs/_components/job-creation-page")
);
const NotFound = lazy(() => import("../pages/not-found"));

const routes: RouteObject[] = [
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <SignInPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <RedirectOnLoad />,
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "jobs/:jobId",
        element: <JobCreationPage />,
      },
      {
        path: "applicants",
        element: <ApplicantsPage />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <PublicRoute>
        <NotFound />
      </PublicRoute>
    ),
  },
];

function RedirectOnLoad() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to jobs page on app load
    navigate("/jobs");
  }, [navigate]);

  return null;
}

export default routes;
