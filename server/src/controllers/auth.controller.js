import { asyncHandler } from "../utils/index.js";
import { AuthService } from "../services/index.js";

export const signupUser = asyncHandler(async (req, res) => {
  const result = await AuthService.signup(req);
  res.status(201).json(result);
});

export const signinUser = asyncHandler(async (req, res) => {
  const result = await AuthService.signin(req);
  res.status(200).json(result);
});

export const refreshUserToken = asyncHandler(async (req, res) => {
  const result = await AuthService.refreshToken(req);
  res.status(200).json(result);
});

export const logoutUser = asyncHandler(async (req, res) => {
  const result = await AuthService.logout(req);
  res.status(200).json(result);
});

export const getUserDetail = asyncHandler(async (req, res) => {
  const result = await AuthService.getUser(req);
  res.status(200).json(result);
});
