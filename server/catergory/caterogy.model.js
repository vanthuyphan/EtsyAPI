const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

CategorySchema.statics = {
    get(id) {
        return this.findById(id)
            .exec()
            .then((category) => {
                if (category) {
                    return category;
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

/**
 * @typedef User
 */
module.exports = mongoose.model('Category', CategorySchema);

