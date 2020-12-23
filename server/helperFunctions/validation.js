const Joi = require("joi");

//Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
//Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    rememberMe: Joi.boolean().required(),
  });
  return schema.validate(data);
};
//Token validation
const tokenValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.tokenValidation = tokenValidation;
