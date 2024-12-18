import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/index.js";

export const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Access token is missing or malformed"));
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return next(new ApiError(401, "Invalid or expired access token"));
    }

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id).select("-password"); // Avoid fetching sensitive data
    if (!user) {
      return next(new ApiError(401, "Invalid or expired access token"));
    }

    // Attach the user to the request object for downstream access
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Pass any unexpected errors to the global error handler
    next(error);
  }
};
