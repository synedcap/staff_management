const Joi = require("joi");

const loginRequest = Joi.object({
  password: Joi.string().required(),

  userName: Joi.string().required(),
});

module.exports = {
  loginRequest,
};
