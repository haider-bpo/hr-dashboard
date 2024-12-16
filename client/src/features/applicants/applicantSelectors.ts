import useApplicantStore, { ApplicantStore } from "./applicantStore";

export const useApplicants = () =>
  useApplicantStore((store: ApplicantStore) => store.applicants);
export const useGetApplicants = () =>
  useApplicantStore((store: ApplicantStore) => store.getApplicants);
export const useRemoveApplicant = () =>
  useApplicantStore((store: ApplicantStore) => store.removeApplicant);
