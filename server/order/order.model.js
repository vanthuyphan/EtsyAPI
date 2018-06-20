const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    shipping: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

OrderSchema.statics = {
    get(id) {
        return this.findById(id)
            .exec()
            .then((order) => {
                if (order) {
                    return order;
                }
                const err = new APIError('No such order exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    list() {
        return this.find()
            .sort({ createdAt: -1 })
            .exec();
    }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Order', OrderSchema);

