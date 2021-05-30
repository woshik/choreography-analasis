module.exports = (roleName) => (req, res, next) => {
  if (req?.user?.role === roleName) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid permission' });
  }
};
