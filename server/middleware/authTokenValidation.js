const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

module.exports = (userType) => (req, res, next) => {
  const token = req.header('X-Auth-Token');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Invalid token' });
      return;
    }

    import(`../app/model/${userType}.js`)
      .then(async (module) => {
        try {
          try {
            const { data: user } = await module.getUser(
              { _id: ObjectId(decoded.id) }, {},
              { active_exercise: 0 },
            );
            const userData = user?.[0] ?? {};

            req.user = userData;
            next();
          } catch (error) {
            next(error);
          }
        } catch (error) {
          next(error);
        }
      })
      .catch((e) => next(e));
  });
};
