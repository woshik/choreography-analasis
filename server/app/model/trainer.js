const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const getUser = asyncFunction(async (where = {}, query = {}, projection = {}) => {
  const trainers = await getDB().collection('trainers');

  const perPage = parseInt(query?.perPage ?? 15, 10);
  const currentPage = parseInt(query?.current_page ?? 1, 10) - 1;

  const exerciseData = await trainers
    .find(where, {
      skip: currentPage * perPage,
      limit: perPage,
      projection,
    })
    .toArray();

  return {
    data: exerciseData,
    total: await trainers.countDocuments(where),
  };
});

const userRegistration = asyncFunction(async (userData) => {
  const trainers = await getDB().collection('trainers');

  const user = await trainers.insertOne(userData);

  return user.insertedCount === 1;
});

const updateTrainer = asyncFunction(async ({ id, ...updateData }) => {
  const trainers = await getDB().collection('trainers');

  const result = await trainers.updateOne(
    { _id: id },
    {
      $set: updateData,
    },
  );

  return result.modifiedCount === 1;
});

const isTrainerActive = asyncFunction(async (id) => {
  const trainers = await getDB().collection('trainers');

  const result = await trainers.findOne(
    { _id: id },
    {
      projection: {
        activate: 1,
        _id: 0,
      },
    },
  );

  return result;
});

module.exports = {
  getUser,
  userRegistration,
  updateTrainer,
  isTrainerActive,
};
