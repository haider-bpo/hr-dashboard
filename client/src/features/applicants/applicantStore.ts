import { create, StateCreator } from "zustand";
import { Applicant } from "./applicantTypes";
import { deleteApplicant, getApplicants } from "./applicantApi";
import { toast } from "@/hooks/use-toast";

export interface ApplicantStore {
  applicants: Applicant[];
  getApplicants: () => Promise<void>;
  deleteApplicant: (applicantId: string) => Promise<void>;
}

const applicantStore: StateCreator<ApplicantStore> = (set) => ({
  applicants: [],
  getApplicants: async () => {
    const res = await getApplicants();

    if (res.data) {
      const { applicants } = res.data;
      set(() => ({
        applicants: applicants,
      }));

      toast({
        title: "Applicants Retrieved Successfully",
        description: "View the retrieved applicants",
        variant: "success",
      });
    }
  },

  deleteApplicant: async (applicantId: string) => {
    const res = await deleteApplicant(applicantId);

    if (res.data) {
      set((state) => ({
        applicants: state.applicants.filter(
          (applicant) => applicant._id !== applicantId
        ),
      }));

      toast({
        title: "Applicant Deleted Successfully",
        description: "View the updated applicant list",
        variant: "success",
      });
    }
  },
});

const useApplicantStore = create<ApplicantStore>(applicantStore);

export default useApplicantStore;
