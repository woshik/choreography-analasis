const Joi = require('joi');

const traineeRegistration = {
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
  password: Joi.string().default('123456'),
};

const trainee = {
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

const exerciseAssign = {
  exerciseId: Joi.string().required(),
  name: Joi.string().required().messages({
    'any.required': 'Exercise name is required',
    'string.empty': 'Exercise name is required',
  }),
  mode: Joi.string().valid('single', 'double').required().messages({
    'any.required': 'Exercise name is required',
    'string.empty': 'Exercise name is required',
  }),
  trainingName: Joi.string().required(),
};

const performedExerciseData = {
  track: Joi.number(),
  trainingName: Joi.string(),
  personOne: Joi.object(),
  personTwo: Joi.object(),
  keyboardCode: Joi.array(),
  index: Joi.string(),
  exerciseId: Joi.string(),
  details: Joi.object(),
  name: Joi.string(),
  mode: Joi.string(),
};

module.exports = {
  trainee,
  traineeRegistration,
  exerciseAssign,
  performedExerciseData,
};
