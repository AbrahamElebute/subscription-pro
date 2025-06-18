import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization?.split(" ")[1];
  }

  if (!token) {
    const error = new Error("Unauthorized access");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      const error = new Error("Unauthorized access");
      error.statusCode = 401;
      return next(error);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    next(error);
  }
};

export default authorize;
