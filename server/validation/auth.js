const Joi = require('joi');

const login = {
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username is required',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
    'string.min': 'Password length must be at least 6 characters long',
  }),
};

module.exports = {
  login,
};
