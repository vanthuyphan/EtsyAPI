const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router();

router.route('/')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/:userId')
  .get(userCtrl.get)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param('userId', userCtrl.load);

module.exports = router;
