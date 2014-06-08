/**
 * Created by mgordeev on 03.06.2014.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function (req, res) {
    res.render('list', {  });
});

router.get('/record', function (req, res) {
    res.render('record', {});
});

router.get('/edit', function (req, res) {
    res.render('edit', {});
});

module.exports = router;