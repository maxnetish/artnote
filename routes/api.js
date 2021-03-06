/**
 * Created by mgordeev on 02.06.2014.
 */

var express = require('express');
var router = express.Router();
var models = require('../models');
var helpersApi = require('../helpers').api;
var locales = require('../locale');
var fakeUserId = 'fake_user_id';

var getUserId = function (req) {
    return fakeUserId;
};

var updatePost = function (id, formData, userId, res) {
    models.Record.findById(id, function (err, record) {
        if (err) {
            res.send(helpersApi.makeResponse(err));
            return;
        }
        if (!record) {
            res.send(helpersApi.makeResponse({
                statusCode: 404,
                message: "Record not found"
            }));
            return;
        }
        if (record.userId !== userId) {
            res.send(helpersApi.makeResponse({
                statusCode: 403,
                message: "Update forbidden"
            }));
            return;
        }
        record.updateFromFormData(formData);
        record.save(function (err, updatedRecord) {
            res.send(helpersApi.makeResponse(err, updatedRecord));
        });
    });
};

var createPost = function (formData, userId, res) {
    var newRecord = new models.Record({
        userId: userId,
        date: formData.date || new Date(),
        title: formData.title || 'No title',
        text: formData.text,
        tags: formData.tags
    });
    newRecord.save(function (err, savedRecord) {
        res.send(helpersApi.makeResponse(err, savedRecord));
    });
};

/* api routes */

router.get('/list', function (req, res) {
    var userId = getUserId(req);
    models.Record.find({userId: userId}, function (err, records) {
        res.send(helpersApi.makeResponse(err, records));
    });
});

router.get('/record/:recordId', function (req, res) {
    var userId = getUserId(req),
        id = req.params.recordId;

    if (!id) {
        res.send(helpersApi.makeResponse({
            statusCode: 400,
            message: "Record id required"
        }));
        return;
    }

    models.Record.findById(id, function (err, record) {
        if (record && (record.userId !== userId)) {
            err = err || {};
            err.statusCode = 403;
            err.message = "Record forbidden";
            record = null;
        }
        res.send(helpersApi.makeResponse(err, record));
    });
});

router.post('/record/:recordId?', function (req, res) {
    var userId = getUserId(req),
        formData = req.body,
        id = req.params.recordId;

    if (id) {
        updatePost(id, formData, userId, res);
    } else {
        createPost(formData, userId, res);
    }
});

router.delete('/record/:recordId', function (req, res) {
    var userId = getUserId(req),
        id = req.params.recordId;

    if (!id) {
        res.send(helpersApi.makeResponse({
            statusCode: 400,
            message: "Record id required"
        }));
        return;
    }

    models.Record.findById(id, function (err, record) {
        if (err) {
            res.send(helpersApi.makeResponse(err));
            return;
        }
        if (!record) {
            res.send(helpersApi.makeResponse({
                statusCode: 404,
                message: "Record not found"
            }));
            return;
        }
        if (record.userId !== userId) {
            res.send(helpersApi.makeResponse({
                statusCode: 403,
                message: "Delete forbidden"
            }));
            return;
        }
        record.remove(function (err) {
            res.send(helpersApi.makeResponse(err));
        });
    });
});

router.get('/locale', function (req, res) {
    var langCode = req.query.lang || 'en',
        localeTable = locales[langCode] || locales.en;

    res.send(localeTable);
});

module.exports = router;