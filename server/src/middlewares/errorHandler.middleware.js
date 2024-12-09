import { ApiError } from "../utils/index.js";

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
  });
};

export default errorHandler;
