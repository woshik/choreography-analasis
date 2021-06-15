const Joi = require('joi');

const exercise = {
  name: Joi.string().required().messages({
    'any.required': 'Exercise name is required',
    'string.empty': 'Exercise name is required',
  }),
  duration: Joi.number().required().messages({
    'any.required': 'Exercise time duration is required',
  }),
  breakPoints: Joi.array().items(Joi.number().required()).required().messages({
    'array.includesRequiredUnknowns': 'Exercise break points are required',
  }),
  description: Joi.string(),
};

const assignCourse = {
  ids: Joi.array().items(Joi.string()).messages({
    'array.includesRequiredUnknowns': 'Student id not found',
  }),
};

const courseEvents = {
  data: Joi.array().items(Joi.object().keys({
    id: Joi.string(),
    title: Joi.string(),
    startTime: Joi.string(),
    endTime: Joi.string(),
    daysOfWeek: Joi.number(),
  })).required().messages({
    'array.includesRequiredUnknowns': 'Student id not found',
  }),
};

const attendance = {
  date: Joi.date().required().messages({
    'any.required': 'Date of birth must be a valid date',
    'date.base': 'Date of birth must be a valid date',
  }),
  attendanceList: Joi.array().items(Joi.string()).required().messages({
    'array.includesRequiredUnknowns': 'Student id not found',
  }),
};

const getAttendance = {
  startDate: Joi.date(),
  endDate: Joi.date(),
  date: Joi.date(),
};

const assignTrainee = {
  ids: Joi.array().items(Joi.string()).messages({
    'array.includesRequiredUnknowns': 'Trainee id not found',
  }),
};

module.exports = {
  exercise,
  assignCourse,
  courseEvents,
  attendance,
  getAttendance,
  assignTrainee,
};
