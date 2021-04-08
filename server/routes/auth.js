const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/register',(req,res) => {

    const password = req.body.password;
    const email = req.body.email;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("INSERT INTO users (password, email) VALUES (?,?)",
        [hash,email],
        (err,result) => {
            if (err) {
                console.log(err);
                res.send({message: "Couldn't create account"})
            } else {
            res.send({message: "Account created!"})
            }
        })
        
    })


})


router.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err,result) => {
            if (err) {
                res.send({err: err});
            } if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error,response) => {
                    if (response) {
                        req.session.user = result;
                        res.send(result);
                    } else {
                        res.send({message: "Wrong password"});
                    }
                })                
            } else {
                res.send({message: "Account not found"})
            }
    });    
});


router.get('/login', (req,res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy();
    res.send("Logout");
    
})

module.exports = router;