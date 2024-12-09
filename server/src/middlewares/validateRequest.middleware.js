import { ZodError } from "zod";
import { ApiError } from "../utils/index.js";

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      // Validate and parse the request body
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Get the first error message from Zod validation
        const firstError = error.errors[0]; // Get the first validation error
        const fieldName = firstError.path[0]; // Field name that failed validation
        const errorMessage = firstError.message; // The error message from Zod

        // Throwing a structured ApiError
        throw new ApiError(
          400,
          `${fieldName} is invalid: ${errorMessage}` || "Invalid Request"
        );
      } else {
        next(error);
      }
    }
  };
};

export default validateRequest;
