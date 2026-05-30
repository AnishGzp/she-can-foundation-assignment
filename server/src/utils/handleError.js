export class AppError extends Error {
  constructor(statusCode, message, details, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: error.details || null,
    });
  }

  console.error("Unexpected error\n", error.stack || error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
