const Joi = require('joi');

const login = {
  email: Joi.string().email().lowercase().required()
    .messages({
      'string.email': 'Enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
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
