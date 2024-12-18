import { API_URL } from "@/config/environment";
import { toast } from "@/hooks/use-toast";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshUserTokens } from "@/features/auth/authApi";

// Create the Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Utility function to manage redirects
let isRedirecting = false;

// Function to refresh the token using refreshToken stored in localStorage
const refreshAuthToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    handleSessionExpired();
    return null;
  }

  try {
    const res = await refreshUserTokens(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = res.data.data;

    // Update localStorage with the new tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken; // Return the new access token
  } catch (error) {
    console.log("error", error);
    // Handle error (e.g., refresh token expired)
    handleSessionExpired();
    return null;
  }
};

// Handle session expiration logic
const handleSessionExpired = () => {
  if (isRedirecting) return; // Prevent infinite redirects
  isRedirecting = true;
  toast({
    title: "Session expired",
    description: "Please log in again.",
    variant: "destructive",
  });

  // Clear session data
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Redirect to sign-in page
  window.location.href = "/signin"; 
};

// Request interceptor to attach the access token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent retry loops

      // Attempt to refresh the token
      const newAccessToken = await refreshAuthToken();
      if (newAccessToken) {
        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } else {
        // If refresh fails, log out the user and clear session
        handleSessionExpired();
      }
    }

    // Handle other types of errors
    if (error.response) {
      const status = error.response.status;
      const errorMessage =
        error.response.data.message || "An unexpected error occurred";

      switch (status) {
        case 400:
          toast({
            title: "Bad Request",
            description: errorMessage,
            variant: "destructive",
          });
          break;
        case 403:
          toast({
            title: "Forbidden",
            description: "You do not have permission",
            variant: "destructive",
          });
          break;
        case 500:
          toast({
            title: "Server Error",
            description: "Please try again later",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
      }
    } else if (error.request) {
      toast({
        title: "Network Error",
        description: "No response from server",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Request Error",
        description: error.message,
        variant: "destructive",
      });
    }

    return Promise.reject(error);
  }
);

export default api;
