import createHttpError from "../utils/helpers/createHttpError.js";

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

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
