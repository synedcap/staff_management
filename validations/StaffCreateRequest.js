const Joi = require("joi");

const staffCreateRequest = Joi.object({
    
  firstName: Joi.string().required(),

  lastName: Joi.string().required(),

  post: Joi.string().required(),

  email: Joi.string().email().required(),

  dateOfStart: Joi.date().required(),
});

module.exports = {
  staffCreateRequest,
};
