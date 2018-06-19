const express = require('express');
const productCtrl = require('./product.controller');

const router = express.Router();

router.route('/')
    .get(productCtrl.list)
    .post(productCtrl.create);

router.route('/active-products')
    .get(productCtrl.getActiveProduct)

router.route('/:productId')
    .get(productCtrl.get)
    .put(productCtrl.update)
    .delete(productCtrl.remove);

module.exports = router;
