const Joi = require('joi');
const { login } = require('./auth');
const { exercise, assignTrainee } = require('./exercise');
const { trainerRegistration, trainer } = require('./trainer');
const {
  traineeRegistration, trainee, exerciseAssign, performedExerciseData,
} = require('./trainee');

const validateId = {
  id: Joi.string().required().messages({
    'any.required': 'Course id is required',
    'string.empty': 'Course id is required',
  }),
};

const userPassword = {
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required',
    'string.empty': 'Current password is required',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'any.required': 'New password is required',
    'string.empty': 'New password is required',
    'string.min': 'New password length must be at least 6 characters long',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Confirm password and password need to be same',
    }),
};

module.exports = {
  login,
  exercise,
  trainer,
  trainerRegistration,
  trainee,
  traineeRegistration,
  userPassword,
  validateId,
  exerciseAssign,
  performedExerciseData,
  assignTrainee,
};
