var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var uniqid = require('uniqid');


/* GET home page. */

router.get('/', function(req, res){
    res.render('index', { title: 'Get Queue Number'});
});

router.get('/home', function(req, res){
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        // no: set a new cookie
        res.cookie('cookieName',uniqid(), { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
    } 
    
    res.render('home', { title: 'Get Queue Number'});
        //res.cookie('name', 'express').send('cookie set'); //Sets name = express
        //res.render('index', { title: 'Get Queue Number'});*/
    });
router.get('/trade', ctrlMain.tradeNumber);
router.get('/complaint', ctrlMain.complaint);
router.get('/justagame', ctrlMain.justagame);
router.get('/chat/:username1/:username2', ctrlMain.chat);
router.get('/control', ctrlMain.control);
router.get('/success/:newusername', ctrlMain.success);
router.get('/rejection', ctrlMain.rejection);
router.get('/admin1', ctrlMain.admin1);
router.get('/tradeingroup/:groupID', ctrlMain.tradeingroup);


module.exports = router;
