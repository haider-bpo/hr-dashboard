import api from "@/app/api";

export const fetchApplicants = async () => api.get("/applicant/");
export const deleteApplicant = async (applicantId: string) =>
  api.delete(`applicant/${applicantId}`);
