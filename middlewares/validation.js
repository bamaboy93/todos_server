const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addTodoValidation: (req, res, next) => {
    const schema = Joi.object({
      text: Joi.string().min(5).max(400).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.details)));
    }

    next();
  },
};
