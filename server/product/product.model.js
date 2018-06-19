const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String
    }
});

ProductSchema.statics = {
    get(id) {
        return this.findById(id)
            .exec()
            .then((product) => {
                if (product) {
                    return product;
                }
                const err = new APIError('No such product exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    list() {
        return this.find()
            .sort({ createdAt: -1 })
            .exec();
    }
};

module.exports = mongoose.model('Product', ProductSchema);