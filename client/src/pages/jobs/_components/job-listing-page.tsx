import { Heading } from "@/components/@core/heading";
import PageContainer from "@/components/layout/page-container";
import { Separator } from "@/components/ui/separator";
import JobsTable from "./jobs-table";
// import { jobs } from "@/constants/data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetJobs } from "@/features/jobs/jobSelectors";

function JobListingPage() {
  const [jobs, setJobs] = useState<any>([]);
  const navigate = useNavigate();
  const getJobs = useGetJobs();

  const jobHandler = () => {
    navigate("/jobs/create");
  };

  const fetchJobs = async () => {
    const jobs = await getJobs();
    setJobs(jobs);
    console.dir('jobs: ', jobs);
  };

  useEffect(() => {
    fetchJobs();
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
            actionButtonHandler={jobHandler}
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
