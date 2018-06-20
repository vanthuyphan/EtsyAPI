const Order = require('./order.model');

function get(req, res) {
    Order.get(id)
        .then((order) => {
            return res.json(order);
        })
        .catch(e => next(e));
}

function create(req, res, next) {
    const order = new Order({
        owner: req.body.owner,
        name: req.body.name,
        shipping: req.body.shipping,
        productName: req.body.productName,
    });

    order.save()
        .then(savedOrder=> res.json(savedOrder))
        .catch(e => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Order.list({ limit, skip })
        .then(orders => {
            res.json(orders)
        })
        .catch(e => next(e));
}

function remove(req, res, next) {
    const orderId = req.params.orderId;
    Order.get(orderId)
        .then((order) => {
            order.remove()
                .then(deletedOrder => res.json(deletedOrder))
                .catch(e => next(e));
        })
        .catch(e => next(e));
}

module.exports = { get, create, list, remove };