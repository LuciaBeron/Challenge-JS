const express = require('express');
const cors = require("cors");
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'challengeDB'
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// ROUTES
app.post('/register',(req,res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("INSERT INTO users (username, password, email) VALUES (?,?,?)",
        [username,hash,email],
        (err,res) => {
            if (err) {
                console.log(err);
            }        
        })
        
    })


})


app.post('/login',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;



    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err,result) => {
            if (err) {
                res.send({err: err});
            } if (result.length > 0) {
                bcrypt.compare(password,result[0].password, (error,response) => {
                    if (response) {
                        res.send(result);
                    } else {
                        res.send({message: "Wrong password"});
                    }
                })                
            } else {
                res.send({message: "User doesn't exist"})
            }
    });    
});



const port = process.env.port || 3040;


app.listen(port, () =>{
    console.log("Running server", port);
});


