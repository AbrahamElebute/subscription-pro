import Subscription from "../models/subscription.model.js";
// import { workflowClient } from "../config/upstash.js";
// import { SERVER_URL } from "../config/env.js";
import sendResponse from "../utils/helpers/sendResponse.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // const { workflowRunId } = await workflowClient.trigger({
    //   url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
    //   body: {
    //     subscriptionId: subscription.id,
    //   },
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   retries: 0,
    // });

    return sendResponse(res, {
      statusCode: 201,
      data: { subscription },
    });
  } catch (e) {
    next(e);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    return sendResponse(res, {
      statusCode: 200,
      data: subscriptions,
    });
  } catch (e) {
    next(e);
  }
};
