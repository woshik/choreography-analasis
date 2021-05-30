const { ObjectId } = require('mongodb');

const convertMongoObjectId = (req, _, next) => {
  if (req?.validationResult?.value?.id) {
    try {
      req.validationResult.value.id = ObjectId(req.validationResult.value.id);
      next();
    } catch (error) {
      next(error);
    }

    return;
  }

  next(new Error('Id not found'));
};

module.exports = convertMongoObjectId;
