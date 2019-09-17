var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

/*
 * GET home page.
 */
router.get('/', ctrlMain.index);

router.get('/search', function(req, res) {
    res.render('search');
});

module.exports = router;
