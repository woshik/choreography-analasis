const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
const {
  getUser,
  userRegistration,
  updateTrainee,
  removeUser,
  resetPassword,
  assignTrainee,
  getExerciseList,
  getActiveExerciseDetails,
  addExercisePerformed,
  completeExercise,
  completeExerciseReport,
  automaticExerciseList,
  automaticExercise,
  setAutomaticExerciseCount,
} = require('../model/trainee');

const { isTrainerActive } = require('../model/trainer');

const login = async (req, res, next) => {
  const { username, password } = req.routeData;

  const { data: user } = await getUser({ username }, {}, { active_exercise: 0 });
  const userData = user?.[0];

  if (!userData) {
    return res.status(400).json({ message: 'Wrong username.' });
  }

  if (!(await isTrainerActive(userData.trainer_id))) {
    return res
      .status(400)
      .json({ message: 'Please contact with your trainer' });
  }

  const isMatch = await bcrypt.compare(password, userData.password);

  if (isMatch) {
    if (userData.role === 'student' && userData.active === false) {
      return res.status(400).json({
        message: 'Please talk with Admin, You account not yet activated.',
      });
    }

    delete userData.password;

    jwt.sign({ id: userData._id }, process.env.SECRET_TOKEN, (err, token) => {
      if (err) {
        return next();
      }

      delete userData._id;

      return res.header('auth-token', token).json({ token, userData });
    });
  } else {
    return res.status(400).json({ message: 'Invalid password' });
  }
};

const add = async (req, res) => {
  const userData = { ...req.routeData };

  const userExist = await getUser({ username: userData.username }, {}, { _id: 1 });

  if (userExist.data.length) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    await bcrypt.genSalt(10),
  );

  userData.password = hashedPassword;
  userData.role = 'trainee';
  userData.trainer_id = req.user._id;

  if (await userRegistration(userData)) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const get = async (req, res) => {
  const where = {
    trainer_id: req.user._id,
    $or: [
      {
        fullName: RegExp(`.*${req.routeData?.search_keyword ?? ''}.*`, 'i'),
      },
      {
        username: RegExp(`.*${req.routeData?.search_keyword ?? ''}.*`, 'i'),
      },
    ],
  };

  res.json(await getUser(where, req.routeData, {
    password: 0, active_exercise: 0, complete_exercise: 0, role: 0, trainer_id: 0,
  }));
};

const totalCount = async (req, res) => res.json({
  count: (await getUser({ trainer_id: req.user._id }, {}, { _id: 1 })).total,
});

const getTraineeById = async (req, res) => {
  const where = {
    trainer_id: req.user._id,
    _id: req.routeData.id,
  };

  res.json(await getUser(where, {}, { _id: 0, fullName: 1, dob: 1 }));
};

const update = async (req, res) => {
  if (await updateTrainee({ ...req.routeData, trainerId: req.user._id })) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const profileUpdate = async (req, res) => {
  if (await updateTrainee({ _id: req.user._id }, req.routeData)) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const reset = async (req, res) => {
  const password = await bcrypt.hash('123456', await bcrypt.genSalt(10));

  if (
    await resetPassword({ ...req.routeData, trainerId: req.user._id, password })
  ) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const assignExercise = async (req, res) => {
  const { id, ...data } = req.routeData;
  data.exerciseId = ObjectId(data.exerciseId);
  data.index = ObjectId();

  if (await assignTrainee({ id, trainerId: req.user._id, ...data })) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const remove = async (req, res) => {
  if (await removeUser({ ...req.routeData, trainerId: req.user._id })) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const getActiveExercise = async (req, res) => {
  res.json(await getExerciseList(req.user._id));
};

const getTraineeExercise = async (req, res) => {
  res.json(await getActiveExerciseDetails({ id: req.user._id, index: req.routeData.id }));
};

const exercisePerformed = async (req, res) => {
  if (await addExercisePerformed({ userId: req.user._id, ...req.routeData })) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const getCompleteExercise = async (req, res) => {
  res.json(await completeExercise(req.routeData.id));
};

const getCompleteExerciseReport = async (req, res) => {
  const { id, exerciseId } = req.routeData;
  res.json(await completeExerciseReport({ id: ObjectId(id), exerciseId: ObjectId(exerciseId) }));
};

const getAutomaticExerciseList = async (req, res) => res.json(await automaticExerciseList(req.user._id));

const getAutomaticExerciseDetails = async (req, res) => res
  .json(await automaticExercise(req.routeData.id, req.user._id));

const automaticExerciseCount = async (req, res) => {
  if (await setAutomaticExerciseCount(req.routeData.id, req.user._id)) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

module.exports = {
  login,
  add,
  get,
  getTraineeById,
  totalCount,
  update,
  reset,
  remove,
  profileUpdate,
  assignExercise,
  getActiveExercise,
  getTraineeExercise,
  exercisePerformed,
  getCompleteExercise,
  automaticExerciseCount,
  getCompleteExerciseReport,
  getAutomaticExerciseList,
  getAutomaticExerciseDetails,
};
