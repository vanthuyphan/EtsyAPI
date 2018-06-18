const Category = require('./caterogy.model');

function get(req, res) {
    Category.get(id)
        .then((category) => {
            return res.json(category);
        })
        .catch(e => next(e));
}

function create(req, res, next) {
    const category = new Category({
        name: req.body.name
    });

    category.save()
        .then(savedCategory=> res.json(savedCategory))
        .catch(e => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Category.list({ limit, skip })
        .then(categories => res.json(categories))
        .catch(e => next(e));
}

function remove(req, res, next) {
    const category = req.category;
    category.remove()
        .then(deletedCategory => res.json(deletedCategory))
        .catch(e => next(e));
}

module.exports = { get, create, list, remove };