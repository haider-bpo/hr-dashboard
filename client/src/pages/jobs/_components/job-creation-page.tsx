import { useParams } from "react-router-dom";
import PageContainer from "@/components/layout/page-container";
import JobForm from "./job-form";
import { Heading } from "@/components/@core/heading";
import { useState } from "react";

function JobCreationPage() {
  const { jobId } = useParams();
  const [isJobExist] = useState(jobId && jobId !== "create" ? true : false);

  return (
    <PageContainer>
      <div className="w-[95%] dark:bg-[#08060F] border mt-2 p-8 m-auto rounded-xl shadow-sm">
        <Heading
          title={`${isJobExist ? "Update" : "Create New"} Job`}
          className="mb-4"
        />
        <JobForm jobId={isJobExist ? jobId : ""} />
      </div>
    </PageContainer>
  );
}

export default JobCreationPage;
