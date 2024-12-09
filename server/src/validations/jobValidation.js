import { z } from "zod";
import {
  DepartmentEnum,
  EmploymentTypeEnum,
  JobTypeEnum,
} from "../constants/enums/job-enums.js";

export const jobValidationSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
  department: z
    .string()
    .refine((val) => Object.values(DepartmentEnum).includes(val), {
      message: "The 'department' field must be selected and valid",
    }),
  employment: z
    .string()
    .refine((val) => Object.values(EmploymentTypeEnum).includes(val), {
      message: "The 'employment' type must be selected and valid",
    }),
  location: z.string().min(1, {
    message: "location is required",
  }),
  type: z.string().refine((val) => Object.values(JobTypeEnum).includes(val), {
    message: "The 'job type' field must be selected and valid",
  }),
  status: z.boolean().optional(),
});
