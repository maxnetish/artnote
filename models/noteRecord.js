/**
 * Created by mgordeev on 02.06.2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = Record;