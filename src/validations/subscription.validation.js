import Joi from "joi";

const createSubscriptionSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Subscription name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 100 characters",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be greater than 0",
    "any.required": "Price is required",
  }),

  currency: Joi.string().valid("USD", "EUR", "GBP").default("USD").messages({
    "any.only": "Currency must be one of USD, EUR, or GBP",
  }),

  frequency: Joi.string()
    .valid("daily", "weekly", "monthly", "yearly")
    .required()
    .messages({
      "any.only": "Frequency must be daily, weekly, monthly, or yearly",
      "any.required": "Frequency is required",
    }),

  category: Joi.string()
    .valid(
      "sports",
      "news",
      "entertainment",
      "lifestyle",
      "technology",
      "finance",
      "politics",
      "other"
    )
    .required()
    .messages({
      "any.only":
        "Category must be one of sports, news, entertainment, lifestyle, technology, finance, politics, or other",
      "any.required": "Category is required",
    }),

  paymentMethod: Joi.string().trim().required().messages({
    "string.empty": "Payment method is required",
    "any.required": "Payment method is required",
  }),

  startDate: Joi.date().less("now").required().messages({
    "date.base": "Start date must be a valid date",
    "date.less": "Start date must be in the past",
    "any.required": "Start date is required",
  }),

  renewalDate: Joi.date().greater(Joi.ref("startDate")).optional().messages({
    "date.greater": "Renewal date must be after the start date",
  }),
});

const userIdParamSchema = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    "any.required": "User ID is required",
    "string.length": "User ID must be a valid 24-character hex string",
  }),
});

const subscriptionIdParamSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const updateSubscriptionSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),

  price: Joi.number().min(0).optional(),

  currency: Joi.string().valid("USD", "EUR", "GBP").optional(),

  frequency: Joi.string()
    .valid("daily", "weekly", "monthly", "yearly")
    .optional(),

  category: Joi.string()
    .valid(
      "sports",
      "news",
      "entertainment",
      "lifestyle",
      "technology",
      "finance",
      "politics",
      "other"
    )
    .optional(),

  paymentMethod: Joi.string().trim().optional(),

  startDate: Joi.date().less("now").optional(),

  renewalDate: Joi.date().greater(Joi.ref("startDate")).optional(),
});

export {
  createSubscriptionSchema,
  userIdParamSchema,
  subscriptionIdParamSchema,
  updateSubscriptionSchema,
};
