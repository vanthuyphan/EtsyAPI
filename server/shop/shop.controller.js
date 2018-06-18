const Shop = require('./shop.model');

function get(req, res) {
    Shop.get(id)
        .then((shop) => {
            return res.json(shop);
        })
        .catch(e => next(e));
}

function create(req, res, next) {
    const shop = new Shop({
        name: req.body.name,
        owner: req.body.owner
    });

    shop.save()
        .then(savedShop=> res.json(savedShop))
        .catch(e => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Shop.list({ limit, skip })
        .then(shops => res.json(shops))
        .catch(e => next(e));
}

function remove(req, res, next) {
    const shop = req.shop;
    shop.remove()
        .then(deletedShop => res.json(deletedShop))
        .catch(e => next(e));
}

module.exports = { get, create, list, remove };