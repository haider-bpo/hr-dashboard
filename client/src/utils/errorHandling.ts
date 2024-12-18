import { toast } from "@/hooks/use-toast";

// Handle HTTP errors and display appropriate messages
export const handleHttpError = (error: any): void => {
  if (error.response) {
    const { status, data } = error.response;
    const errorMessage = data?.message || "An unexpected error occurred";

    switch (status) {
      case 400:
        showErrorToast("Bad Request", errorMessage);
        break;
      case 403:
        showErrorToast("Forbidden", "You do not have permission.");
        break;
      case 500:
        showErrorToast("Server Error", "Please try again later.");
        break;
      default:
        showErrorToast("Error", errorMessage);
    }
  } else if (error.request) {
    showErrorToast("Network Error", "No response from server.");
  } else {
    showErrorToast("Request Error", error.message);
  }
};

const showErrorToast = (title: string, description: string): void => {
  toast({
    title,
    description,
    variant: "destructive",
  });
};
