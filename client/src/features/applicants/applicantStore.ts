import { create, StateCreator } from "zustand";
import { Applicant } from "./applicantTypes";
import { deleteApplicant, fetchApplicants } from "./applicantApi";
import { toast } from "@/hooks/use-toast";

export interface ApplicantStore {
  applicants: Applicant[];
  getApplicants: () => Promise<void>;
  removeApplicant: (applicantId: string) => Promise<void>;
}

const applicantStore: StateCreator<ApplicantStore> = (set) => ({
  applicants: [],
  getApplicants: async () => {
    const res = await fetchApplicants();

    if (res.data) {
      const { applicants } = res.data;
      set(() => ({
        applicants: applicants,
      }));
    }
  },

  removeApplicant: async (applicantId: string) => {
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
