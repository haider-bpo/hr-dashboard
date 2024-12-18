import api from "@/app/api";
import { User } from "./authTypes";

export const fetchUser = async () => api.get("/auth/me");
export const signupUser = async (userData: User) =>
  api.post("/auth/signup", userData);
export const signinUser = async (userCredential: User) =>
  api.post("/auth/signin", userCredential);
export const logoutUser = async () => api.post(`/auth/logout`);
export const refreshUserTokens = async (refreshToken: string) =>
  api.post(`/auth/refresh-token`, { refreshToken });
