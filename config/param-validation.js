const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }
  },

  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
