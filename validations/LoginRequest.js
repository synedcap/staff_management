const Joi = require("joi");

const loginRequest = Joi.object({
  password: Joi.string().required(),

  username: Joi.string().required(),
});

module.exports = {
    loginRequest,
};
