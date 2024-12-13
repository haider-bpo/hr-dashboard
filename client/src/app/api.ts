import { API_URL } from "@/config/environment";
import { toast } from "@/hooks/use-toast";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Define a response type for better type safety (customize as needed)
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Create the Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor with correct typing
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const errorMessage =
        error.response.data.message || "An unexpected error occurred";

      // More sophisticated error handling
      switch (status) {
        case 400:
          toast({
            title: "Bad Request",
            description: errorMessage,
            variant: "destructive",
          });
          break;
        case 401:
          toast({
            title: "Unauthorized",
            description: "Please log in again",
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
        case 404:
          toast({
            title: "Not Found",
            description: errorMessage,
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

      // Selective logging (avoid logging sensitive data)
      console.error("API Error:", {
        status,
        message: errorMessage,
      });
    } else if (error.request) {
      // No response received
      toast({
        title: "Network Error",
        description: "No response from server",
        variant: "destructive",
      });
    } else {
      // Something went wrong setting up the request
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
