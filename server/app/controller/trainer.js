const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUser, userRegistration, updateTrainer } = require('../model/trainer');

const login = async (req, res, next) => {
  const { username, password } = req.routeData;

  const { data: user } = await getUser({ username });
  const userData = user?.[0];

  if (!userData) {
    return res.status(400).json({ message: 'Wrong username.' });
  }

  const isMatch = await bcrypt.compare(password, userData.password);

  if (isMatch) {
    delete userData.password;

    if (!userData.activate) {
      updateTrainer({ id: userData._id, activate: true });
    }

    jwt.sign({ id: userData._id }, process.env.SECRET_TOKEN, (err, token) => {
      if (err) {
        return next();
      }

      delete userData._id;

      return res
        .header('auth-token', token)
        .json({ token, userData });
    });
  } else {
    return res.status(400).json({ message: 'Invalid password' });
  }
};

const add = async (req, res) => {
  const userData = { ...req.routeData };

  const { data: user } = await getUser({ username: userData.username }, {}, { _id: 1 });
  const userExist = user?.[0];

  if (userExist) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

  userData.password = hashedPassword;
  userData.role = 'trainer';
  userData.activate = true;

  delete userData.confirmPassword;

  if (await userRegistration(userData)) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const profileUpdate = async (req, res) => {
  if (await updateTrainer({ id: req.user._id, ...req.routeData })) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const passwordUpdate = async (req, res) => {
  const isMatch = await bcrypt.compare(req.routeData.currentPassword, req.user.password);

  if (isMatch) {
    const hashedPassword = await bcrypt.hash(req.routeData.newPassword, await bcrypt.genSalt(10));

    if (await updateTrainer({ id: req.user._id, password: hashedPassword })) {
      res.json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Operation fail, Try again later' });
    }
  } else {
    res.status(400).json({ message: 'Invalid current password' });
  }
};

const deactivate = async (req, res) => {
  if (await updateTrainer({ id: req.user._id, activate: false })) {
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
  deactivate,
  profileUpdate,
  passwordUpdate,
};
