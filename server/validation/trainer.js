const Joi = require('joi');

const trainerRegistration = {
  fullName: Joi.string().min(3).required().messages({
    'any.required': 'Full name is required',
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters long',
  }),
  dob: Joi.date().required().messages({
    'any.required': 'Date of birth must be a valid date',
    'date.base': 'Date of birth must be a valid date',
  }),
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
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password and password need to be same',
  }),
};

const trainer = {
  fullName: Joi.string().min(3).required().messages({
    'any.required': 'Full name is required',
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters long',
  }),
  dob: Joi.date().required().messages({
    'any.required': 'Date of birth must be a valid date',
    'date.base': 'Date of birth must be a valid date',
  }),
};

module.exports = {
  trainer,
  trainerRegistration,
};
