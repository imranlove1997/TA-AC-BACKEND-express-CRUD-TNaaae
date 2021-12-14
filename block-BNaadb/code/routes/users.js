var express = require('express');
var router = express.Router();
var User = require('../models/users');

router.get('/', (req, res) => {

    User.find({}, (err, users) => {
        if(err) return next(err);
        res.render('allUsers', { users: users});
    });
});

router.get('/new', (req, res) => {
    res.render('addForm');
});

router.post('/', (req, res) => {
    User.create(req.body, (err, userCreated) => {
        if(err) return next(err);
        res.redirect('/users');
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    User.findById(id, (err, user) => {
        if(err) return next(err);
        res.render('singleUser', { user: user });
    });
});

router.get('/:id/edit', (req, res) => {
    var id = req.params.id;
    User.findById(id, (err, user) => {
        if(err) return next(err);
        res.render('updateForm', { user: user});
    });
});

router.post('/:id', (req, res) => {
    var id = req.params.id;
    User.findByIdAndUpdate(id, req.body, (err, userUpdated) => {
        if(err) return next(err);
        res.redirect('/users/' + id );
    })
})

router.get('/:id/delete', (req, res) => {
    var id = req.params.id;
    User.findByIdAndDelete(id, (err, userDeleted) => {
        if(err) return next(err);
        res.redirect('/users');
    });
});

module.exports = router;