import { Heading } from "@/components/@core/heading";
import PageContainer from "@/components/layout/page-container";
import { Separator } from "@/components/ui/separator";
import JobsTable from "./jobs-table";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetJobs, useJobs } from "@/features/jobs/jobSelectors";

function JobListingPage() {
  const navigate = useNavigate();
  const getJobs = useGetJobs();
  const jobs = useJobs();

  const jobCreationHandler = () => {
    navigate("/jobs/create");
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <PageContainer scrollable>
      <div className="space-y-4" data-aos="fade-up">
        {/* heading  */}
        <div className="flex items-start justify-between">
          <Heading
            title="Jobs"
            description="Posted jobs"
            actionButtonLabel="Create new job"
            actionButtonHandler={jobCreationHandler}
            data-aos="fade-down"
          />
        </div>

        {/* seprator  */}
        <Separator />

        {/* job list  */}
        <JobsTable data={jobs} />
      </div>
    </PageContainer>
  );
}

export default JobListingPage;
