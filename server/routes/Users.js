var express = require('express');
const User = require('../models/User');
var router = express.Router();

router.get('/', (req, res) => {
    User.fetchAll()
        .then(users => {
            console.log(JSON.stringify(users));
            res.json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.post('/', (req, res) => {
    console.log('users post', req.body)
    User.query({where: {email: req.body.email}})
    .fetch()
    .then((user) => {
        console.log('user', user);
        if (user) {
            // party?
            console.log('got it already')
            res.json(user);
        } else {
            const newUser = new User({
                email: req.body.email,
                firstName: req.body.given_name,
                lastName: req.body.family_name
            });
            newUser.save()
                .then((result) => {
                    res.json(result)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                });
        }
    })
})
            
router.put('/:userID', (req, res) => {
    console.log(req.params.userID);
    User
        .query({where: {id: req.params.userID}})
        .fetch()
        .then((user) => {
            user.set(req.body)
                .save()
                .then((result) => {
                    res.json(result);
                })
            
        })
        
})
            
router.delete('/:userID', (req, res) => {
    console.log(req.params.userID);
    User
        .query({where: {id: req.params.userID}})
        .fetch()
        .then((user) => {
            user.destroy()
                .then((result) => {
                    res.json({success: true});
                })
            
        })
        
})

module.exports = router;