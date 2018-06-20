const express = require('express');
const orderCtrl = require('./order.controller');

const router = express.Router();

router.route('/')
    .get(orderCtrl.list)
    .post(orderCtrl.create);

router.route('/:orderId')
    .get(orderCtrl.get)
    .delete(orderCtrl.remove);

module.exports = router;
