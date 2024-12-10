import cloudinary from "../config/cloudinary.js";
import { Applicant } from "../models/index.js";
import { ApiError, ApiResponse } from "../utils/index.js";

export class ApplicantService {
  static async create(req) {
    const { name, email, phone, city, experience, department } = req.body;

    const resumeUrl = req.file.path;

    const newApplicant = await Applicant.create({
      name,
      email,
      phone,
      city,
      experience,
      department,
      resume: resumeUrl,
    });

    return new ApiResponse(
      { newApplicant },
      201,
      "Applicant created successfully"
    );
  }

  static async delete(req) {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);
    if (!applicant) {
      throw new ApiError(404, "Applicant not found");
    }

    const deletedApplicant = await Applicant.findOneAndDelete(id);

    // Extract the public ID from the URL
    const publicId = this.extractPublicId(deletedApplicant?.resume);

    // Delete the file from Cloudinary
    await cloudinary.api.delete_resources([publicId]);

    return new ApiResponse(
      { deletedApplicant },
      200,
      "Applicant deleted successfully"
    );
  }

  static async getAll(req) {
    const applicants = await Applicant.find({});
    return new ApiResponse(
      { applicants },
      200,
      "Applicants fetched successfully"
    );
  }

  static extractPublicId(url) {
    const parts = url.split("/");
    const fileNameWithExtension = parts.pop(); // Get the last part of the URL
    const folderPath = parts.slice(7).join("/"); // Extract folder path after the domain
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove the extension
    return `${folderPath}/${fileName}`;
  }
}
