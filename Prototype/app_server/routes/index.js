var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

router.get('/', ctrlMain.home);

router.post('/search', ctrlMain.getCollegeInfo);

module.exports = router;
