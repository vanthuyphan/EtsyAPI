const express = require('express');
const productCtrl = require('./product.controller');

const router = express.Router();

router.route('/')
    .get(productCtrl.list)
    .post(productCtrl.create);

router.route('/:productId')
    .get(productCtrl.get)
    .delete(productCtrl.remove);

module.exports = router;
