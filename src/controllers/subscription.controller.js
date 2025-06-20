import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";
import sendResponse from "../utils/helpers/sendResponse.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    return sendResponse(res, {
      statusCode: 201,
      data: { subscription, workflowRunId },
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

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().populate(
      "user",
      "name email"
    );
    return sendResponse(res, {
      statusCode: 200,
      data: subscriptions,
      message: "All subscriptions retrieved successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return sendResponse(res, {
      statusCode: 200,
      message: "Subscription retrieved successfully",
      data: subscription,
    });
  } catch (e) {
    next(e);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated: true, updatedAt: new Date() },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return sendResponse(res, {
      statusCode: 200,
      message: "Subscription updated successfully",
      data: subscription,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return sendResponse(res, {
      statusCode: 200,
      message: "Subscription deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return sendResponse(res, {
      statusCode: 200,
      message: "Subscription cancelled successfully",
      data: subscription,
    });
  } catch (e) {
    next(e);
  }
};

export const upcomingRenewals = async (req, res, next) => {
  try {
    const today = new Date();
    const upcomingDate = new Date();
    upcomingDate.setDate(today.getDate() + 7);

    const renewals = await Subscription.find({
      user: req.user._id,
      renewalDate: { $gte: today, $lte: upcomingDate },
      status: "active",
    }).populate("user", "name email");

    return sendResponse(res, {
      statusCode: 200,
      data: renewals,
      message: "Upcoming renewals retrieved successfully",
    });
  } catch (e) {
    next(e);
  }
};
