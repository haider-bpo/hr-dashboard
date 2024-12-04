import { Heading } from "@/components/@core/heading";
import PageContainer from "@/components/layout/page-container";
import { Separator } from "@/components/ui/separator";
import JobsTable from "./jobs-table";
import { jobs } from "@/constants/data";

function JobListingPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        {/* heading  */}
        <div className="flex items-start justify-between">
          <Heading title="Jobs" description="Posted jobs" />
        </div>

        {/* seprator  */}
        <Separator />

        {/* job list  */}
        <JobsTable data={jobs} totalData={jobs.length} />
      </div>
    </PageContainer>
  );
}

export default JobListingPage;
