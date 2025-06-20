import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  subscriptionIdParamSchema,
  createSubscriptionSchema,
  userIdParamSchema,
  updateSubscriptionSchema,
} from "../validations/subscription.validation.js";
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

// Upcoming Renewals — no param validation needed
subscriptionRouter.get("/upcoming-renewals", authorize, upcomingRenewals);

// Create and Get All Subscriptions
subscriptionRouter
  .route("/")
  .get(getAllSubscriptions)
  .post(authorize, validate(createSubscriptionSchema), createSubscription);

// Subscription by ID
subscriptionRouter
  .route("/:id")
  .get(
    authorize,
    validate(subscriptionIdParamSchema, "params"),
    getSubscriptionById
  )
  .put(
    authorize,
    validate(subscriptionIdParamSchema, "params"),
    validate(updateSubscriptionSchema),
    updateSubscription
  )
  .delete(
    authorize,
    validate(subscriptionIdParamSchema, "params"),
    deleteSubscription
  );

// Get User Subscriptions
subscriptionRouter.get(
  "/user/:id",
  authorize,
  validate(userIdParamSchema, "params"),
  getUserSubscriptions
);

// Cancel Subscription
subscriptionRouter.put(
  "/:id/cancel",
  authorize,
  validate(subscriptionIdParamSchema, "params"),
  cancelSubscription
);

export default subscriptionRouter;
