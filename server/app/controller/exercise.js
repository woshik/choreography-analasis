const { ObjectId } = require('mongodb');
const {
  addExercise,
  getExercise,
  updateExercise,
  removeExercise,
  automaticExercise,
  assignTrainee,
} = require('../model/exercise');

const add = async (req, res) => {
  req.routeData.trainer_id = req.user._id;

  if (await addExercise(req.routeData)) {
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
        name: RegExp(`.*${req.routeData?.search_keyword ?? ''}.*`, 'i'),
      },
    ],
  };

  res.json(await getExercise(where, req.routeData, {}));
};

const getExerciseById = async (req, res) => res.json(
  await getExercise(
    { _id: req.routeData.id, trainer_id: req.user._id },
    {},
    { _id: 0 },
  ),
);

const totalCount = async (req, res) => res.json({
  count: (await getExercise({ trainer_id: req.user._id }, {}, { _id: 1 }))
    .total,
});

const update = async (req, res) => {
  if (await updateExercise({ ...req.routeData, trainerId: req.user._id })) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const remove = async (req, res) => {
  if (await removeExercise({ ...req.routeData, trainerId: req.user._id })) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const getAutomaticExercise = async (req, res) => res
  .json(await automaticExercise({ ...req.routeData, trainerId: req.user._id }));

const assignAutomaticExercise = async (req, res) => {
  const ids = req.routeData.ids.map((id) => ObjectId(id));

  if (await assignTrainee({ id: req.routeData.id, ids, trainerId: req.user._id })) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

module.exports = {
  add,
  get,
  totalCount,
  update,
  remove,
  getExerciseById,
  getAutomaticExercise,
  assignAutomaticExercise,
};
