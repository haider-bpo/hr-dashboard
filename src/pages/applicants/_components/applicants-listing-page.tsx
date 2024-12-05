import { Heading } from "@/components/@core/heading";
import PageContainer from "@/components/layout/page-container";
import { Separator } from "@/components/ui/separator";
import { applicants } from "@/constants/data";
import ApplicantsTable from "./applicants-table";

function ApplicantListingPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        {/* heading  */}
        <div className="flex items-start justify-between">
          <Heading title="Applicants" description="Applicants detail" />
        </div>

        {/* seprator  */}
        <Separator />

        {/* job list  */}
        <ApplicantsTable data={applicants} />
      </div>
    </PageContainer>
  );
}

export default ApplicantListingPage;
