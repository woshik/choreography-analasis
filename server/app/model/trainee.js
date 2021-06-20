const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const getUser = asyncFunction(
  async (where = {}, query = {}, projection = {}) => {
    const trainees = await getDB().collection('trainees');

    const perPage = parseInt(query?.perPage ?? 15, 10);
    const currentPage = parseInt(query?.current_page ?? 1, 10) - 1;

    const exerciseData = await trainees
      .find(where, {
        skip: currentPage * perPage,
        limit: perPage,
        projection,
      })
      .toArray();

    return {
      data: exerciseData,
      total: await trainees.countDocuments(where),
    };
  },
);

const userRegistration = asyncFunction(async (userData) => {
  const users = await getDB().collection('trainees');

  const user = await users.insertOne(userData);

  return user.insertedCount === 1;
});

const updateTrainee = asyncFunction(
  async ({ id, trainerId, ...updateData }) => {
    const trainees = await getDB().collection('trainees');

    const result = await trainees.updateOne(
      { _id: id, trainer_id: trainerId },
      {
        $set: updateData,
      },
    );

    return result.modifiedCount === 1;
  },
);

const resetPassword = asyncFunction(async ({ id, trainerId, password }) => {
  const trainees = await getDB().collection('trainees');

  const result = await trainees.updateOne(
    { _id: id, trainer_id: trainerId },
    {
      $set: {
        password,
      },
    },
  );

  return result.modifiedCount === 1;
});

const assignTrainee = asyncFunction(async ({ id, trainerId, ...data }) => {
  const trainees = await getDB().collection('trainees');

  const result = await trainees.updateOne(
    { _id: id, trainer_id: trainerId },
    {
      $push: {
        active_exercise: data,
      },
    },
  );

  return result.modifiedCount === 1;
});

const removeUser = asyncFunction(async ({ id, trainerId }) => {
  const trainees = await getDB().collection('trainees');

  const result = await trainees.deleteOne({
    _id: id,
    trainer_id: trainerId,
  });

  return result.deletedCount === 1;
});

const getExerciseList = asyncFunction(async (id) => {
  const trainees = await getDB().collection('trainees');

  const data = await trainees
    .aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: 'exercises',
          localField: 'active_exercise.exerciseId',
          foreignField: '_id',
          as: 'exerciseDetails',
        },
      },
      {
        $project: {
          _id: 0,
          active_exercise: 1,
          exerciseDetails: 1,
        },
      },
    ])
    .toArray();

  const exerciseData = data[0] ?? {};

  const response = exerciseData?.active_exercise?.map((item) => {
    const returnValue = { ...item };
    const exerciseId = item?.exerciseId;

    const details = exerciseData?.exerciseDetails?.filter(
      (exercise) => exercise._id.toString() === exerciseId.toString(),
    );

    returnValue.exercise = details?.[0] ?? {};

    return returnValue;
  }) ?? [];

  return response;
});

const getActiveExerciseDetails = asyncFunction(async ({ id, index }) => {
  const trainees = await getDB().collection('trainees');
  const exercises = await getDB().collection('exercises');

  const activeExercise = await trainees.findOne(
    { _id: id },
    {
      projection: {
        _id: 0,
        active_exercise: 1,
      },
    },
  );

  const exercise = activeExercise?.active_exercise?.filter(
    (item) => item.index.toString() === index.toString(),
  )?.[0] ?? {};

  const details = await exercises.findOne({
    _id: exercise.exerciseId,
  }, {
    projection: {
      _id: 0,
    },
  });

  exercise.details = details;

  return exercise;
});

const addExercisePerformed = asyncFunction(async (data) => {
  const trainees = await getDB().collection('trainees');

  const activeExerciseResult = await trainees.updateOne({
    _id: data.userId,
  }, {
    $pull: {
      active_exercise: {
        index: data.id,
      },
    },
  });

  if (activeExerciseResult.modifiedCount === 1) {
    const result = await trainees.updateOne({
      _id: data.userId,
    }, {
      $push: {
        complete_exercise: data,
      },
    });

    return result.modifiedCount === 1;
  }

  return false;
});

const completeExercise = asyncFunction(async (id) => {
  const trainees = await getDB().collection('trainees');

  const result = await trainees.findOne({
    _id: id,
  }, {
    projection: {
      _id: 0,
      complete_exercise: 1,
    },
  });

  return result;
});

const completeExerciseReport = asyncFunction(async ({ id, exerciseId }) => {
  const trainees = await getDB().collection('trainees');

  const result = await trainees.findOne({
    _id: id,
  }, {
    projection: {
      _id: 0,
      complete_exercise: 1,
    },
  });
  const response = result?.complete_exercise?.filter((item) => item.index === exerciseId.toString())?.[0] ?? [];

  return response;
});

const automaticExerciseList = asyncFunction(async (id) => {
  const exercises = await getDB().collection('exercises');
  const trainees = await getDB().collection('trainees');

  let exerciseResult = await trainees.findOne({ _id: id }, {
    projection: {
      _id: 0,
      automatic_exercise: 1,
    },
  });

  exerciseResult = exerciseResult?.automatic_exercise ?? [];

  const result = await exercises.find({
    trainee: id,
  }, {
    projection: {
      trainer_id: 0,
      trainee: 0,
    },
  }).toArray();

  return result.map((item) => ({ ...item, ...exerciseResult.find((ex) => ex._id.toString() === item._id.toString()) }));
});

const automaticExercise = asyncFunction(async (id, traineeId) => {
  const exercises = await getDB().collection('exercises');

  const trainees = await getDB().collection('trainees');

  let exerciseResult = await trainees.findOne({ _id: traineeId }, {
    projection: {
      _id: 0,
      automatic_exercise: {
        $elemMatch: {
          _id: id,
        },
      },
    },
  });

  exerciseResult = exerciseResult?.automatic_exercise?.[0].count ?? 0;

  const result = await exercises.findOne({
    _id: id,
  }, {
    projection: {
      trainer_id: 0,
      trainee: 0,
    },
  });

  return { ...result, count: exerciseResult };
});

const setAutomaticExerciseCount = asyncFunction(async (id, traineeId) => {
  const trainees = await getDB().collection('trainees');
  let result;

  if (await trainees.findOne({ _id: traineeId, 'automatic_exercise._id': id })) {
    result = await trainees.updateOne({
      _id: traineeId,
      'automatic_exercise._id': id,
    }, {
      $inc: {
        'automatic_exercise.$.count': 1,
      },
    });
  } else {
    result = await trainees.updateOne({
      _id: traineeId,
    }, {
      $push: {
        automatic_exercise: {
          _id: id,
          count: 1,
        },
      },
    });
  }

  return result.modifiedCount === 1;
});

module.exports = {
  getUser,
  userRegistration,
  updateTrainee,
  resetPassword,
  removeUser,
  assignTrainee,
  getExerciseList,
  getActiveExerciseDetails,
  addExercisePerformed,
  completeExercise,
  completeExerciseReport,
  automaticExerciseList,
  automaticExercise,
  setAutomaticExerciseCount,
};
