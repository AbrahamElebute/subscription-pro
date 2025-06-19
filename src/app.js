import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import express from "express";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import userRouter from "./routes/user.route.js";
import workflowRouter from "./routes/workflow.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Subscription Tracker API!",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

export default app;
