import aj from "../config/arcjet.js";
import createHttpError from "../utils/createHttpError.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      const reason = decision.reason;

      if (reason.isRateLimit()) {
        return next(createHttpError("Rate limit exceeded", 429));
      }

      if (reason.isBot()) {
        return next(createHttpError("Bot detected", 403));
      }

      return next(
        createHttpError(
          `Access denied: ${reason?.toString?.() || "Unknown reason"}`,
          403
        )
      );
    }

    next();
  } catch (error) {
    console.error("Arcjet Middleware Error:", error);
    next(error);
  }
};

export default arcjetMiddleware;
