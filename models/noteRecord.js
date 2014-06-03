/**
 * Created by mgordeev on 02.06.2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

// Schemas
var Record = new Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    }
});
Record.methods.updateFromFormData = function (formData) {
    formData = formData || {};
    if (formData.date) {
        this.date = formData.date;
    }
    if (_.isString(formData.title)) {
        this.title = formData.title;
    }
    if (_.isString(formData.text)) {
        this.text = formData.text;
    }
    if (_.isArray(formData.tags)) {
        this.tags = formData.tags;
    }
};


module.exports = Record;