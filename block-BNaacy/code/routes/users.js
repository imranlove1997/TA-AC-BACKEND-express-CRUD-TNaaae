var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', (req, res) => {
    res.render('user');
});

router.get('/new', (req, res) => {
    res.render('newForm');
});

router.post('/', (req, res) => {
    console.log(req.body);

    User.create(req.body, (err, addUser) => {
        if(err) res.redirect('/new');
        res.redirect('/users');
    });
});


module.exports = router;