const {
  login,
  exercise,
  validateId,
  trainer,
  trainerRegistration,
  trainee,
  traineeRegistration,
  userPassword,
  exerciseAssign,
  performedExerciseData,
  assignTrainee,
} = require('../validation/index');

const {
  authTokenValidation,
  permission,
  convertMongoObjectId,
} = require('../middleware');

const validate = require('../validation/validate');

module.exports = {
  trainerRegistration: {
    url: '/trainer',
    method: 'post',
    controller: 'trainer',
    function: 'add',
    middleware: [validate(trainerRegistration)],
  },
  login: {
    url: '/trainer/login',
    method: 'post',
    controller: 'trainer',
    function: 'login',
    middleware: [validate(login)],
  },
  trainerUpdate: {
    url: '/trainer/update',
    method: 'patch',
    controller: 'trainer',
    function: 'profileUpdate',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(trainer),
    ],
  },
  trainerPasswordUpdate: {
    url: '/trainer/password',
    method: 'patch',
    controller: 'trainer',
    function: 'passwordUpdate',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(userPassword),
    ],
  },
  trainerAccountDeactivate: {
    url: '/trainer/deactivate',
    method: 'patch',
    controller: 'trainer',
    function: 'deactivate',
    middleware: [authTokenValidation('trainer'), permission('trainer')],
  },

  getExercise: {
    url: '/exercise',
    method: 'get',
    controller: 'exercise',
    function: 'get',
    middleware: [authTokenValidation('trainer'), permission('trainer')],
  },
  createExercise: {
    url: '/exercise',
    method: 'post',
    controller: 'exercise',
    function: 'add',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(exercise),
    ],
  },
  deleteExercise: {
    url: '/exercise',
    method: 'delete',
    controller: 'exercise',
    function: 'remove',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  getExerciseCount: {
    url: '/exercise/count',
    method: 'get',
    controller: 'exercise',
    function: 'totalCount',
    middleware: [authTokenValidation('trainer'), permission('trainer')],
  },
  getAutomaticExercise: {
    url: '/exercise/automatic/:id',
    method: 'get',
    controller: 'exercise',
    function: 'getAutomaticExercise',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  assignAutomaticExercise: {
    url: '/exercise/assign/:id',
    method: 'post',
    controller: 'exercise',
    function: 'assignAutomaticExercise',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId, assignTrainee),
      convertMongoObjectId,
    ],
  },
  getExerciseById: {
    url: '/exercise/:id',
    method: 'get',
    controller: 'exercise',
    function: 'getExerciseById',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  updateExercise: {
    url: '/exercise/:id',
    method: 'patch',
    controller: 'exercise',
    function: 'update',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId, exercise),
      convertMongoObjectId,
    ],
  },

  getTrainee: {
    url: '/trainee',
    method: 'get',
    controller: 'trainee',
    function: 'get',
    middleware: [authTokenValidation('trainer'), permission('trainer')],
  },
  traineeRegistration: {
    url: '/trainee',
    method: 'post',
    controller: 'trainee',
    function: 'add',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(traineeRegistration),
    ],
  },
  traineeLogin: {
    url: '/trainee/login',
    method: 'post',
    controller: 'trainee',
    function: 'login',
    middleware: [validate(login)],
  },

  getActiveExercise: {
    url: '/trainee/active-exercise',
    method: 'get',
    controller: 'trainee',
    function: 'getActiveExercise',
    middleware: [authTokenValidation('trainee'), permission('trainee')],
  },
  getExerciseDetails: {
    url: '/trainee/active-exercise/:id',
    method: 'get',
    controller: 'trainee',
    function: 'getTraineeExercise',
    middleware: [
      authTokenValidation('trainee'),
      permission('trainee'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  automaticExerciseCount: {
    url: '/trainee/automatic-exercise/count/:id',
    method: 'post',
    controller: 'trainee',
    function: 'automaticExerciseCount',
    middleware: [
      authTokenValidation('trainee'),
      permission('trainee'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  getAutomaticExerciseDetails: {
    url: '/trainee/automatic-exercise/:id',
    method: 'get',
    controller: 'trainee',
    function: 'getAutomaticExerciseDetails',
    middleware: [
      authTokenValidation('trainee'),
      permission('trainee'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  resetTraineePassword: {
    url: '/trainee/reset',
    method: 'patch',
    controller: 'trainee',
    function: 'reset',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  getTraineeCount: {
    url: '/trainee/count',
    method: 'get',
    controller: 'trainee',
    function: 'totalCount',
    middleware: [authTokenValidation('trainer'), permission('trainer')],
  },
  deleteTrainee: {
    url: '/trainee',
    method: 'delete',
    controller: 'trainee',
    function: 'remove',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  getAutomaticExerciseList: {
    url: '/trainee/automatic-exercise',
    method: 'get',
    controller: 'trainee',
    function: 'getAutomaticExerciseList',
    middleware: [authTokenValidation('trainee'), permission('trainee')],
  },
  getTraineeById: {
    url: '/trainee/:id',
    method: 'get',
    controller: 'trainee',
    function: 'getTraineeById',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },

  updateTrainee: {
    url: '/trainee/:id',
    method: 'patch',
    controller: 'trainee',
    function: 'update',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId, trainee),
      convertMongoObjectId,
    ],
  },

  assignExercise: {
    url: '/trainee/assign/:id',
    method: 'post',
    controller: 'trainee',
    function: 'assignExercise',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId, exerciseAssign),
      convertMongoObjectId,
    ],
  },

  exercisePerformed: {
    url: '/trainee/performed/:id',
    method: 'post',
    controller: 'trainee',
    function: 'exercisePerformed',
    middleware: [
      authTokenValidation('trainee'),
      permission('trainee'),
      validate(validateId, performedExerciseData),
      convertMongoObjectId,
    ],
  },

  getCompleteExercise: {
    url: '/trainee/complete-exercise/:id',
    method: 'get',
    controller: 'trainee',
    function: 'getCompleteExercise',
    middleware: [
      authTokenValidation('trainer'),
      permission('trainer'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },

  getCompleteExerciseReport: {
    url: '/trainee/complete-exercise/:id/:exerciseId',
    method: 'get',
    controller: 'trainee',
    function: 'getCompleteExerciseReport',
    middleware: [authTokenValidation('trainer'), permission('trainer')],
  },

};
