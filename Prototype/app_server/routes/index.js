var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

router.get('/', ctrlMain.home);
router.post('/register', ctrlMain.post_register);
router.post('/login', ctrlMain.post_login);
router.get('/logout', ctrlMain.get_logout);
router.get('/protected', ctrlMain.check_logged_In, ctrlMain.get_protected);
router.get('/search', ctrlMain.get_collegeInfo);
router.get('/overview', ctrlMain.get_overview);
router.get('/contact', ctrlMain.get_contact);

module.exports = router;
