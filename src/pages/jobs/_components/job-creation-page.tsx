// import { useParams } from "react-router-dom";
import JobForm from "./job-form";
import { Heading } from "@/components/@core/heading";

function JobCreationPage() {
  // const { jobId } = useParams();
  return (
    <div className="w-[95%] dark:bg-[#08060F] border mt-2 p-8 m-auto rounded-xl shadow-sm">
      <Heading title="Create New Job" className="mb-4" />
      <JobForm />
    </div>
  );
}

export default JobCreationPage;