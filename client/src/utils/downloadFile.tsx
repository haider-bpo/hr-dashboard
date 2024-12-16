// utils/downloadFileUtils.ts

import { toast } from "@/hooks/use-toast";

export const downloadFileFromUrl = (url: string, filename: string) => {
  if (!url) {
    console.error("No file URL provided.");
    return;
  }

  // Fetch the file from the URL
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch the file.");
      }
      return response.blob(); // Convert the response to a Blob
    })
    .then((blob) => {
      // Create a temporary URL for the Blob object
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename; // Specify the filename

      // Append the link to the DOM, simulate a click, and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up the link and revoke the Blob URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error("Error downloading the file:", error);
      toast({
        title: "Error Downloading File",
        description: "Failed to download the file",
        variant: "destructive",
      });
    });
};
