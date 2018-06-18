const express = require('express');
const categoryCtrl = require('./caterory.controller');

const router = express.Router();

router.route('/')
    .get(categoryCtrl.list)
    .post(categoryCtrl.create);

router.route('/:categoryId')
    .get(categoryCtrl.get)
    .delete(categoryCtrl.remove);

module.exports = router;
