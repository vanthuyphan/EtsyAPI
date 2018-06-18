const express = require('express');
const shopCtrl = require('./shop.controller');

const router = express.Router();

router.route('/')
    .get(shopCtrl.list)
    .post(shopCtrl.create);

router.route('/:shopId')
    .get(shopCtrl.get)
    .delete(shopCtrl.remove);

module.exports = router;
