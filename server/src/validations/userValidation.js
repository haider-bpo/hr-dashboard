import { z } from "zod";

export const signupValidationSchema = z.object({
  username: z.string().min(1, {
    message: "username is required",
  }),
  name: z.string().min(1, {
    message: "username is required",
  }),
  password: z.string().min(1, {
    message: "username is required",
  }),
});


export const signinValidationSchema = z.object({
  username: z.string().min(1, {
    message: "username is required",
  }),
  password: z.string().min(1, {
    message: "username is required",
  }),
});
