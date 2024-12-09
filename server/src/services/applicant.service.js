import { Applicant } from "../models/index.js";
import { ApiError, ApiResponse } from "../utils/index.js";

export class ApplicantService {
  static async create(req) {
    const { name, email, phone, city, experience, department, resume } =
      req.body;

    const newApplicant = await Applicant.create({
      name,
      email,
      phone,
      city,
      experience,
      department,
      resume,
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
}
