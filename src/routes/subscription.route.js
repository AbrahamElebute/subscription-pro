import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createSubscriptionSchema } from "../validations/subscription.validation.js";
import {
  createSubscription,
  getUserSubscriptions,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  upcomingRenewals,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter
  .route("/")
  .get(getAllSubscriptions)
  .post(authorize, validate(createSubscriptionSchema), createSubscription);

subscriptionRouter
  .route("/:id")
  .get(getSubscriptionById)
  .put(updateSubscription)
  .delete(deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", cancelSubscription);

subscriptionRouter.get("/upcoming-renewals", upcomingRenewals);

export default subscriptionRouter;
