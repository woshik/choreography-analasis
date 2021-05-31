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
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username is required',
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
