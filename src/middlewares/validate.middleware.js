import createHttpError from "../utils/helpers/createHttpError.js";

/**
 * Validates the incoming request using a Joi schema.
 * @param {Joi.ObjectSchema} schema - The Joi schema to validate against
 * @param {string} type - The request part to validate: "body", "params", or "query"
 */

const validate =
  (schema, type = "body") =>
  (req, res, next) => {
    const dataToValidate = req[type];

    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (!error) return next();

    const errors = {};
    error.details.forEach((detail) => {
      const field = detail.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(detail.message);
    });

    return next(createHttpError("Validation failed", 422, errors));
  };

export default validate;
