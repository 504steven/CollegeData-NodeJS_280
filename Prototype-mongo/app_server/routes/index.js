var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");
var modelMain = require("../models/modelMain");


router.get('/', ctrlMain.get_register);
router.get('/admin', ctrlMain.get_admin);
router.post('/register', ctrlMain.post_register);
router.post('/login', ctrlMain.post_login);
router.get('/logout', ctrlMain.get_logout);
router.get('/home', ctrlMain.check_logged_In, ctrlMain.get_homePage);
router.get('/overview', ctrlMain.check_logged_In, ctrlMain.get_overview);
router.get('/searchResult', ctrlMain.check_logged_In, ctrlMain.get_collegeInfo);
router.post('/add', ctrlMain.post_add);
router.post('/delete', ctrlMain.post_delete);
router.post('/update', ctrlMain.post_update);
router.post('/display', ctrlMain.post_display);
router.post('/populate', ctrlMain.post_populate);
router.get('/showAll', modelMain.showAllUniv);

module.exports = router;
