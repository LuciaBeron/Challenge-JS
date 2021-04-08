const express = require('express');
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// MIDDLEWARE
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24 * 1000
      },
    })
  );

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

    const password = req.body.password;
    const email = req.body.email;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("INSERT INTO users (password, email) VALUES (?,?)",
        [hash,email],
        (err,res) => {
            if (err) {
                console.log(err);
            }        
        })
        
    })


})


app.post('/login',(req,res) => {
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


app.get('/login', (req,res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }
})

app.get('/logout', (req,res) => {
    req.session.destroy();
    
})



app.get('/balance',(req,res) => {
    const id = req.session.user[0].id;

    db.query("SELECT SUM(amount) as deposits FROM records WHERE userID = ? AND type_of_operation = 'deposit'", [id],
    (err,deposits) => {
        if (err) {
            console.log(err);
        } 

        db.query("SELECT SUM(amount) as substract FROM records WHERE userID = ? AND type_of_operation = 'withdrawal'", [id],(error,withdrawals) => { 
            if (error) {
                console.log(error);
            } 

            const sum = (add, subst) =>{
                if (add == null) {
                    add = 0;
                }
                if (subst == null) {
                    subst = 0;
                }
                return (add-subst);
            }
                    
            res.send({balance:  sum(deposits[0].deposits, withdrawals[0].substract)});
            
        })

    })

})


app.post('/manage', (req,res) => {
    const type = req.body.type;
    const date = req.body.date;
    const amount = req.body.amount;
    const id = req.session.user[0].id;

    db.query("INSERT INTO records (type_of_operation,amount,operationDate, userID) values (?,?,?,?)",[type,amount,date,id],
    (err,result) => {
        if (err) {
            console.log(err);
        }
        
    })
})

app.get('/home', (req,res) => {
    const id = req.session.user[0].id;
    db.query("SELECT type_of_operation, amount FROM records WHERE userID = ? LIMIT 10", [id],
    (error,result) => {
        if (error) {
            console.log(error);
        }
        res.send({operations: result});
    })
})

app.get('/operations', (req,res) => {
    const id = req.session.user[0].id;
    db.query("SELECT type_of_operation, amount,operationID, operationDate FROM records WHERE userID = ?", [id],
    (error,result) => {
        if (error) {
            console.log(error);
        }
        res.send({operations: result});
    })

})

app.delete('/operations',(req,res) => {
    const id = req.body.id;
    console.log("ID??: ",id);
    db.query("DELETE FROM records WHERE operationID = ?", [id], (err,result) => {
        if (err) {
            console.log(err);
        }
        res.send("Deleted");
    })
})

app.put('/operations',(req,res) => {
    const id = req.body.id;
    const amount = req.body.form.amount;
    const date = req.body.form.date;
    
    db.query("UPDATE records SET amount = ?, operationDate = ? WHERE operationID = ?", [amount,date,id]
    ,(err,result) => {
        if (err) {
            console.log(err);
        }
        res.send("changes done");

    })
})

const port = process.env.port || 3040;


app.listen(port, () => {
    console.log("Running server", port);
});


