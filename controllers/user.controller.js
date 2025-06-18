import mongoose from "mongoose";
import User from "../models/user.model.js";
import sendResponse from "../utils/sendResponse.js";
import createHttpError from "../utils/createHttpError.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return next(createHttpError("No users found", 403));
    }

    return sendResponse(res, {
      statusCode: 200,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    error.statusCode = 500;
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const ID = req.params.id;

  const validationErrors = {};

  if (!ID) validationErrors.id = ["User ID is required"];
  if (!mongoose.Types.ObjectId.isValid(ID))
    validationErrors.id = ["Invalid User ID format"];

  if (Object.keys(validationErrors).length > 0) {
    return next(createHttpError("Validation failed", 422, validationErrors));
  }

  try {
    const user = await User.findById(ID).select("-password");

    if (!user) {
      return next(createHttpError("User not found", 404));
    }

    return sendResponse(res, {
      statusCode: 200,
      message: `User with ID ${ID} fetched successfully`,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};

export { getUsers, getUser };
