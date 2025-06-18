/* eslint-disable no-undef */
import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DB_URI is not defined in the environment variables.");
}

const connectToDatabase = async () => {
  try {
    console.log(`Connecting to MongoDB in ${NODE_ENV} mode...`);

    await mongoose.connect(DB_URI);
    console.log(`✅ Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
