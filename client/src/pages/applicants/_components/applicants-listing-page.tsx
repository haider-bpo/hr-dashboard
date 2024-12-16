import { Heading } from "@/components/@core/heading";
import PageContainer from "@/components/layout/page-container";
import { Separator } from "@/components/ui/separator";
// import { applicants } from "@/constants/data";
import ApplicantsTable from "./applicants-table";
import {
  useApplicants,
  useGetApplicants,
} from "@/features/applicants/applicantSelectors";
import { useEffect } from "react";

function ApplicantListingPage() {
  const applicants = useApplicants();
  const getApplicants = useGetApplicants();

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <PageContainer scrollable>
      <div className="space-y-4" data-aos="fade-up">
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
