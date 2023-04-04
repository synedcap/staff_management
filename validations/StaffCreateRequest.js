const Joi = require("joi");

const staffCreateRequest = Joi.object({
  firstName: Joi.string().required(),

  lastName: Joi.string().required(),

  post: Joi.string().required(),

  email: Joi.string().email().required(),

  dateOfBirth: Joi.date().required(),

  departments: Joi.string().required(),
});

module.exports = {
  staffCreateRequest,
};
