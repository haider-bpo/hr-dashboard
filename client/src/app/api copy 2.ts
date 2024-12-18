import { API_URL } from "@/config/environment";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshUserTokens } from "@/features/auth/authApi";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "@/utils/auth";
import { handleHttpError } from "@/utils/errorHandling";
import { toast } from "@/hooks/use-toast";

// Axios instance setup
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Function to refresh the authentication token
const refreshAuthToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    handleSessionExpired();
    return null;
  }

  try {
    const { data } = await refreshUserTokens(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = data;

    setTokens(accessToken, newRefreshToken); // Update tokens in storage
    return accessToken; // Return new access token
  } catch (error) {
    console.log("error", error);
    handleSessionExpired();
    return null;
  }
};

// Handle session expiration
const handleSessionExpired = (): void => {
  toast({
    title: "Session expired",
    description: "Please log in again.",
    variant: "destructive",
  });

  clearTokens(); // Clear stored tokens

  if (window.location.pathname !== "/signin") {
    window.location.href = "/signin"; // Redirect to signin page if not already there
  }
};

// Request Interceptor: Attach the access token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration and retry logic
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as retried

      const newAccessToken = await refreshAuthToken();
      if (newAccessToken) {
        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    // Handle other HTTP errors
    handleHttpError(error);

    return Promise.reject(error);
  }
);

export default api;
