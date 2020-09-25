const users = require('../../utils/users');

/* GET home page. */
//statistics
//var homePageVisited = 0;
var tradeNumberPageVisited = 0;
var complaintPageVisited = 0;
var justAgamePageVisited = 0;
var chatPageVisited = 0;
var controlPageVisited = 0;
var successPageVisited = 0;
var rejectionPageVisited = 0;
var tradeingroupPageVisited = 0;
var contactPageVisited = 0;
var disclaimerPageVisited = 0;

var home = (req, res) => {
    /*homePageVisited++;
    console.log(homePageVisited);*/
    res.render('home', { title: 'Your Queue Number'});
};
var tradeNumber = (req, res) => {
    tradeNumberPageVisited++;
    var clients = users.getAllClients();
    res.render('trade', { title: 'Trade Number',
    queueNumbers : clients});
};
var complaint = (req, res) => {
    complaintPageVisited++;
    res.render('complaint', { title: 'Write a Complaint'});
};
var justagame = (req, res) => {
    justAgamePageVisited++;
    res.render('justagame', {title: 'It is just a game'});
};
var chat = (req, res) => {
    chatPageVisited++;
    res.render('chat', {title: 'Chat', username1: req.params.username1, username2:req.params.username2});
};
var control = (req, res) => {
    controlPageVisited++;
    res.render('control', {title: 'Track Visitors'});
};
var success = (req, res) => {
    successPageVisited++;
    res.render('success', {title: 'Success!', username: req.params.newusername});
};
var rejection = (req, res) => {
    rejectionPageVisited++;
    res.render('rejection', {title: 'Unsuccessful Number Trade'});
};
var admin1 = (req, res) => {
    res.render('admin', {title: 'Admin', 
    tradeNumberPageVisited: tradeNumberPageVisited,
    complaintPageVisited: complaintPageVisited,
    justAgamePageVisited : justAgamePageVisited,
    chatPageVisited: chatPageVisited,
    controlPageVisited: controlPageVisited,
    successPageVisited: successPageVisited,
    rejectionPageVisited: rejectionPageVisited,
    tradeingroupPageVisited: tradeingroupPageVisited,
    contactPageVisited: contactPageVisited,
    disclaimerPageVisited: disclaimerPageVisited
    });
};
var tradeingroup = (req, res) => {
    tradeingroupPageVisited++;
    res.render('tradeingroup', {title: 'Trade in group', groupID: req.params.groupID});
};
var contact = (req, res) => {
    contactPageVisited++;
    res.render('contact', {title: 'Contact'});
};
var disclaimer = (req, res) => {
    disclaimerPageVisited++;
    res.render('disclaimer', {title: 'Disclaimer'});
};
var about = (req, res) => {
    res.render('about', {title: 'About'});
};
module.exports = {
    home,
    tradeNumber,
    complaint,
    justagame,
    chat,
    control,
    success,
    rejection,
    admin1,
    tradeingroup,
    contact,
    disclaimer,
    about
}