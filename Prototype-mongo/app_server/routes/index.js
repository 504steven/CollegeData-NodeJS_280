var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

router.get('/', ctrlMain.get_register);
router.get('/admin', ctrlMain.get_admin);
router.post('/register', ctrlMain.post_register);
router.post('/login', ctrlMain.post_login);
router.get('/logout', ctrlMain.get_logout);
router.get('/home', ctrlMain.check_logged_In, ctrlMain.get_homePage);
router.get('/overview', ctrlMain.check_logged_In, ctrlMain.get_overview);
router.get('/searchResult', ctrlMain.check_logged_In, ctrlMain.get_collegeInfo);
// router.post('/addUniversityData', ctrlMain.check_logged_In, ctrlMain);
// router.post('/delUniversityData', ctrlMain.check_logged_In, ctrlMain);
// router.post('/updateUniversityData', ctrlMain.check_logged_In, ctrlMain);

module.exports = router;
