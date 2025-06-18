import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get("/", (req, res) => {
  res.send("get all workflows");
});
workflowRouter.post("/create", (req, res) => {
  res.send("create workflow");
});
