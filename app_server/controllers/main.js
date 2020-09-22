const users = require('../../utils/users');

/* GET home page. */

var index = (req, res) => {
    res.render('index', { title: 'Get Queue Number'});
};
var tradeNumber = (req, res) => {
    var clients = users.getAllClients();
    res.render('trade', { title: 'Trade Queue Number',
    queueNumbers : clients});
};
var complaint = (req, res) => {
    res.render('complaint', { title: 'Write a complaint'});
};
var justagame = (req, res) => {
    res.render('justagame', {title: 'It is just a game'});
};
var chat = (req, res) => {
    res.render('chat', {title: 'Chat', username1: req.params.username1, username2:req.params.username2});
};
var control = (req, res) => {
    res.render('control', {title: 'Control Visitors'});
};
var success = (req, res) => {
    res.render('success', {title: 'Success!', username: req.params.newusername});
};
var rejection = (req, res) => {
    res.render('rejection', {title: 'Unsuccessful Number Trade'});
};
var admin1 = (req, res) => {
    res.render('admin', {title: 'Admin'});
};
module.exports = {
    index,
    tradeNumber,
    complaint,
    justagame,
    chat,
    control,
    success,
    rejection,
    admin1
}