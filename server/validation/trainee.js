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
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username is required',
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
  mode: Joi.string().valid('Single', 'Double').required().messages({
    'any.required': 'Exercise name is required',
    'string.empty': 'Exercise name is required',
  }),
  trainingName: Joi.string().required(),
  bodyPosition: Joi.string().required(),
  eyesActivity: Joi.string().required(),
};

const performedExerciseData = {
  track: Joi.number().required(),
  trainingName: Joi.string().required(),
  personOne: Joi.object(),
  personTwo: Joi.object(),
  index: Joi.string().required(),
  exerciseId: Joi.string().required(),
  details: Joi.object(),
  name: Joi.string().required(),
  mode: Joi.string().required(),
  bodyPosition: Joi.string().required(),
  eyesActivity: Joi.string().required(),
  type: Joi.string().required(),
  create_at: Joi.date(),
};

module.exports = {
  trainee,
  traineeRegistration,
  exerciseAssign,
  performedExerciseData,
};
