/**
 * Created by mgordeev on 02.06.2014.
 */
var mongoose = require('mongoose');
var noteRecordSchema = require('./noteRecord');

mongoose.connect('mongodb://localhost/artnote');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Mongoose connection error:', err.message);
});
db.once('open', function callback() {
    console.log("Mongoose connected to DB!");
});

module.exports = {
    Record: db.model("Record", noteRecordSchema)
};
