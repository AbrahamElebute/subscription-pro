/* eslint-disable no-undef */
import app from "./src/app.js";
import { PORT } from "./src/config/env.js";
import connectToDatabase from "./src/database/mongodb.js";

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
