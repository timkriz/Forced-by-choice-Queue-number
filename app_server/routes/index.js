var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/trade', ctrlMain.tradeNumber);
router.get('/complaint', ctrlMain.complaint);
router.get('/justagame', ctrlMain.justagame);
router.get('/chat/:username1/:username2', ctrlMain.chat);
router.get('/control', ctrlMain.control);
router.get('/success/:newusername', ctrlMain.success);
router.get('/rejection', ctrlMain.rejection);
router.get('/admin1', ctrlMain.admin1);

module.exports = router;
