import useApplicantStore, { ApplicantStore } from "./applicantStore";

export const useApplicants = () =>
  useApplicantStore((store: ApplicantStore) => store.getApplicants);
export const useDeleteApplicant = () =>
  useApplicantStore((store: ApplicantStore) => store.deleteApplicant);
