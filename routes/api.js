/**
 * Created by mgordeev on 02.06.2014.
 */

var express = require('express');
var router = express.Router();
var models = require('../models');
var fakeUserId = 'fake_user_id';

/* api routes */

router.get('/list', function (req, res) {
    var userId = fakeUserId;
    models.Record.find({userId: userId}, function (err, records) {
        res.send({
            status: 200,
            records: records
        });
    });
});

router.get('/record/:recordId', function (req, res) {
    res.send({
        status: 200,
        request: 'GET record',
        query: req.query,
        params: req.params
    });
});

router.put('/record/:recordId', function (req, res) {
    res.send({
        status: 200,
        request: 'PUT record',
        query: req.query,
        params: req.params
    });
});

router.post('/record', function (req, res) {
    var userId = fakeUserId;
    var formData = req.body;
    var newRecord = new models.Record({
        userId: userId,
        date: formData.date || new Date(),
        title: formData.title || 'No title',
        text: formData.text,
        tags: formData.tags
    });
    newRecord.save(function (err, savedRecord) {
        res.send({
            status: 200,
            record: savedRecord
        });
    });
});

router.delete('/record/:recordId', function (req, res) {
    res.send({
        status: 200,
        request: 'DELETE record',
        query: req.query,
        params: req.params
    });
});

module.exports = router;