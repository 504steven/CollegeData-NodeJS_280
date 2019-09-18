var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

/*
 * GET home page.
 */
// router.get('/', ctrlMain.index);

router.get('/index', function(req, res) {
    res.render('index');
});

router.post('/search', ctrlMain.getCollegeInfo);

module.exports = router;
