const express = require('express');
const cors = require("cors");
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());


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


app.post('/register',(req,res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    db.query("INSERT INTO users (username, password, email) VALUES (?,?,?)",
    [username,password,email],
    (err,res) => {
        if (err) {
            console.log(err);
        }        
    })
})


app.post('/login',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err,result) => {
            if (err) {
                console.log("Error!")
                res.send({err: err});
            } if (!result.length == 0) {
                console.log(result);
                res.send(result);
            } else {
                console.log("Wrong username/password!")
                res.send({message: "Wrong username/password"})
            }
           
    });    
});



const port = process.env.port || 3040;


app.listen(port, () =>{
    console.log("Running server", port);
});


