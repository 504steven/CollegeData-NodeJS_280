var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

router.get('/', ctrlMain.home);

router.post('/search', ctrlMain.getCollegeInfo);

router.get('/overview', ctrlMain.get_overview);

module.exports = router;
