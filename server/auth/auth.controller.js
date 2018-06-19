const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email, password: password})
        .then(user => {
          if (user) {
              const token = jwt.sign({
                  email: user.email
              }, config.jwtSecret);
              return res.json({token: token, email: user.email, name: user.name});
          } else {
              const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
              return next(err);
          }
        })
        .catch(e => next(e));
}

function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber };
