import api from "@/app/api";

export const getApplicants = async () => api.get("/applicant/");
export const deleteApplicant = async (applicantId: string) =>
  api.delete(`applicant/${applicantId}`);
