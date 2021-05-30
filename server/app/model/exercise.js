const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const addExercise = asyncFunction(async (exerciseData) => {
  const exercises = await getDB().collection('exercises');
  const exercise = await exercises.insertOne(exerciseData);
  return exercise.insertedCount === 1;
});

const getExercise = asyncFunction(async (where = {}, query = {}, projection = {}) => {
  const exercises = await getDB().collection('exercises');

  const perPage = parseInt(query?.perPage ?? 15, 10);
  const currentPage = parseInt(query?.current_page ?? 1, 10) - 1;

  const exerciseData = await exercises
    .find(where, {
      skip: currentPage * perPage,
      limit: perPage,
      projection,
    })
    .toArray();

  return {
    data: exerciseData,
    total: await exercises.countDocuments(where),
  };
});

const updateExercise = asyncFunction(async ({ id, trainerId, ...updateData }) => {
  const exercises = await getDB().collection('exercises');

  const result = await exercises.updateOne(
    { _id: id, trainer_id: trainerId },
    {
      $set: updateData,
    },
  );

  return result.modifiedCount === 1;
});

const removeExercise = asyncFunction(async ({ id, trainerId }) => {
  const exercises = await getDB().collection('exercises');

  const result = await exercises.deleteOne({
    _id: id,
    trainer_id: trainerId,
  });

  return result.deletedCount === 1;
});

module.exports = {
  addExercise,
  getExercise,
  updateExercise,
  removeExercise,
};
