import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";
// import authorize from "../middlewares/auth.middleware.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", sendReminders);

workflowRouter.get("/subscription/reminder", (req, res) => {
  res.status(200).json({ message: "Reminder workflow is POST only" });
});

export default workflowRouter;
