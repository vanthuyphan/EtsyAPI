const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    products: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    ]
});

ShopSchema.statics = {
    get(id) {
        return this.findById(id)
            .exec()
            .then((shop) => {
                if (shop) {
                    return shop;
                }
                const err = new APIError('No such category exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    list() {
        return this.find()
            .sort({ createdAt: -1 })
            .exec();
    }
};

module.exports = mongoose.model('Shop', ShopSchema);