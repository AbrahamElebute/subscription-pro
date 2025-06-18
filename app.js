import express from "express";
import { PORT } from "./src/config/env.js";
import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";
import subscriptionRouter from "./src/routes/subscription.route.js";
import connectToDatabase from "./src/database/mongodb.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./src/middlewares/arcjet.middleware.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);

  await connectToDatabase();
});

app.use(errorMiddleware);
