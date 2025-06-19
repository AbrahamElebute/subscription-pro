import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import createHttpError from "../utils/helpers/createHttpError.js";

const authorize = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization?.split(" ")[1];
  }

  if (!token) {
    return next(createHttpError("Unauthorized access", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(createHttpError("Unauthorized access", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    next(error);
  }
};

export default authorize;
