const errorMiddleware = (err, req, res, next) => {
  console.error(" Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";
  let errors = null;

  // Handle specific Mongoose errors
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  } else if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = {};

    // Format each field's error message(s) into an array
    for (const key in err.errors) {
      errors[key] = [err.errors[key].message];
    }
  }

  // If  error has a structured errors object (e.g., from createHttpError)
  if (err.errors && typeof err.errors === "object" && !errors) {
    errors = err.errors;
  }

  try {
    const errorResponse = {
      success: false,
      statusCode,
      message,
    };

    if (errors) {
      errorResponse.errors = errors;
    }

    res.status(statusCode).json(errorResponse);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
