const Product = require('./product.model');

function get(req, res) {
    Product.get(id)
        .then((product) => {
            return res.json(product);
        })
        .catch(e => next(e));
}

function create(req, res, next) {
    const product = new Product({
        name: req.body.name
    });

    product.save()
        .then(savedProduct=> res.json(savedProduct))
        .catch(e => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Product.list({ limit, skip })
        .then(products => res.json(products))
        .catch(e => next(e));
}

function remove(req, res, next) {
    const Product = req.product;
    Product.remove()
        .then(deletedProduct => res.json(deletedProduct))
        .catch(e => next(e));
}

module.exports = { get, create, list, remove };