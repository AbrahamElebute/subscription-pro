import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/email/send-email.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  console.log("▶️ Reminder workflow started");
  console.log(
    "Request payload:",
    JSON.stringify(context.requestPayload, null, 2)
  );

  const { subscriptionId } = context.requestPayload;

  if (!subscriptionId) {
    console.error("❌ No subscriptionId provided in request payload");
    return;
  }

  console.log(`🔍 Fetching subscription: ${subscriptionId}`);
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription) {
    console.log(`❌ Subscription not found: ${subscriptionId}`);
    return;
  }

  console.log(`📋 Subscription found:`, {
    id: subscription._id,
    status: subscription.status,
    renewalDate: subscription.renewalDate,
    userEmail: subscription.user?.email,
  });

  if (subscription.status !== "active") {
    console.log(`⏹️ Subscription not active: ${subscription.status}`);
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);
  console.log(`📅 Renewal date: ${renewalDate.format()}`);
  console.log(`📅 Current date: ${dayjs().format()}`);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `⏰ Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`
    );
    return;
  }

  console.log(`🔔 Processing ${REMINDERS.length} reminder intervals`);

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    console.log(`📝 Processing reminder:`, {
      daysBefore,
      reminderDate: reminderDate.format(),
      now: dayjs().format(),
      isAfterNow: reminderDate.isAfter(dayjs()),
      isSameDay: dayjs().isSame(reminderDate, "day"),
      daysDiff: dayjs().diff(reminderDate, "day"),
    });

    if (reminderDate.isAfter(dayjs())) {
      console.log(
        `⏰ Scheduling sleep until ${daysBefore} days before reminder`
      );
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
      console.log(
        `🚀 Woke up! Triggering reminder for ${daysBefore} days before`
      );
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription
      );
    } else if (dayjs().isSame(reminderDate, "day")) {
      console.log(
        `🚀 Triggering immediate reminder for ${daysBefore} days before`
      );
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription
      );
    } else {
      console.log(
        `⏭️ Skipping reminder for ${daysBefore} days before (date has passed)`
      );
    }
  }

  console.log("✅ Reminder workflow completed successfully");
});

// 🚫 Do NOT wrap context.run in try/catch
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    const subscription = await Subscription.findById(subscriptionId).populate(
      "user",
      "name email"
    );
    console.log(`📊 Database query result:`, {
      found: !!subscription,
      id: subscription?._id,
      hasUser: !!subscription?.user,
    });
    return subscription;
  });
};

// 🚫 Do NOT wrap context.sleepUntil in try/catch
const sleepUntilReminder = async (context, label, date) => {
  console.log(`😴 Sleeping until ${label} reminder at ${date.format()}`);
  await context.sleepUntil(label, date.toDate());
  console.log(`⏰ Woke up for ${label}`);
};

// 🚫 Do NOT wrap context.run in try/catch
const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`🚀 Triggering ${label} reminder`);

    if (!subscription.user?.email) {
      console.error(`❌ No email found for subscription ${subscription._id}`);
      return;
    }

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });

    console.log(
      `✅ ${label} reminder sent successfully to ${subscription.user.email}`
    );
  });
};
