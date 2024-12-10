import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/apiError.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "applicant_resumes", // Cloudinary folder name
    format: async (req, file) => {
      const allowedFormats = ["pdf", "docx"];
      const fileExtension = file.originalname.split(".").pop().toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        throw new ApiError(
          400,
          "Invalid file format. Only PDF and DOCX are allowed."
        );
      }
      return fileExtension; // Retain the original file format
    },
    public_id: (req, file) => {
      // Generate unique filename: originalname_date
      const fileBaseName = file.originalname.split(".")[0];
      const timestamp = new Date().toISOString().replace(/:/g, "-"); // Replace ':' to make it filename-safe
      return `${fileBaseName}_${timestamp}`;
    },
    public_id: (req, file) => file.originalname.split(".")[0], // Use the original file name
  },
});

const upload = multer({ storage });

export default upload;
