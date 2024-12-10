import { z } from "zod";
import { DepartmentEnum } from "../constants/enums/job-enums.js";

export const applicantValidationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .trim(),
  phone: z.string().min(1, "Phone number is required").trim(),
  city: z.string().min(1, "City is required").trim(),
  experience: z.string().min(1, "Experience is required").trim(),
  department: z
    .string()
    .refine((val) => Object.values(DepartmentEnum).includes(val), {
      message: "The 'department' field must be selected and valid",
    }),
  // resume: z.string().min(1, "Resume is required").trim(),
  status: z.boolean().optional(),
});
