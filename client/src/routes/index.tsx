import { lazy, useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/dashboard-layout";
import JobsPage from "@/pages/jobs";
import SignInPage from "@/pages/auth/sign-in";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const ApplicantsPage = lazy(() => import("@/pages/applicants"));
const JobCreationPage = lazy(
  () => import("@/pages/jobs/_components/job-creation-page")
);
const NotFound = lazy(() => import("../pages/not-found"));

const routes: RouteObject[] = [
  {
    path: "/signin",
    element: (
      <SignedOut>
        <SignInPage />
      </SignedOut>
    ),
  },

  {
    path: "",
    element: (
      <SignedIn>
        <DashboardLayout />
      </SignedIn>
    ),
    children: [
      {
        path: "/",
        element: (
          <SignedIn>
            <RedirectOnLoad />
          </SignedIn>
        ),
      },
      {
        path: "jobs",
        element: (
          <SignedIn>
            <JobsPage />
          </SignedIn>
        ),
      },
      {
        path: "jobs/:jobId",
        element: (
          <SignedIn>
            <JobCreationPage />
          </SignedIn>
        ),
      },
      {
        path: "applicants",
        element: (
          <SignedIn>
            <ApplicantsPage />
          </SignedIn>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <SignedOut>
        <NotFound />
      </SignedOut>
    ),
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
