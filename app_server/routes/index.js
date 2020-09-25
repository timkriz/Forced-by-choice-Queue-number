var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var uniqid = require('uniqid');

//statistics

/* GET home page. */

var PageVisited = 0;
var homePageVisited = 0;

router.get('/', function(req, res){
    PageVisited++;
    res.render('index', { title: 'Enter'});
});

router.get('/home', function(req, res){
    homePageVisited++;
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
router.get('/tradeingroup/chat/:username1/:username2', ctrlMain.chat);
router.get('/control', ctrlMain.control);
router.get('/success/:newusername', ctrlMain.success);
router.get('/rejection', ctrlMain.rejection);
router.get('/admin1', ctrlMain.admin1);
router.get('/tradeingroup/:groupID', ctrlMain.tradeingroup);
router.get('/contact', ctrlMain.contact);
router.get('/disclaimer', ctrlMain.disclaimer);
router.get('/about', ctrlMain.about);

router.get('/admin2', (req, res) => {
    res.render('admin', {title: 'Admin2', 
    PageVisited: PageVisited,
    homePageVisited: homePageVisited
    });
});

module.exports = router;
