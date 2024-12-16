import { z } from "zod";
import {
  DepartmentEnum,
  EmploymentTypeEnum,
  JobTypeEnum,
} from "@/constants/enums/job-enums";

export const jobFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.nativeEnum(DepartmentEnum, {
    errorMap: () => ({ message: "Please select a department" }),
  }),
  employment: z.nativeEnum(EmploymentTypeEnum, {
    errorMap: () => ({ message: "Please select an employment type" }),
  }),
  location: z.string().min(1, "Location is required"),
  type: z.nativeEnum(JobTypeEnum, {
    errorMap: () => ({ message: "Please select a job type" }),
  }),
  description: z
    .string()
    .min(10, {
      message: "Description is required, must be at least 10 characters long.",
    })
    .max(5000, { message: "Description cannot exceed 5000 characters." }),
});
