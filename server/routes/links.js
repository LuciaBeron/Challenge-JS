const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/balance',(req,res) => {
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


router.post('/manage', (req,res) => {
    const type = req.body.type;
    const date = req.body.date;
    const amount = req.body.amount;
    const concept = req.body.concept;
    const id = req.session.user[0].id;

    db.query("INSERT INTO records (type_of_operation,amount,operationDate, userID, concept) values (?,?,?,?,?)",
    [type,amount,date,id,concept],
    (err,result) => {
        if (err) {
            console.log(err);
        }
        
    })
})

router.get('/home', (req,res) => {
    const id = req.session.user[0].id;
    db.query("SELECT type_of_operation, amount FROM records WHERE userID = ? LIMIT 10", [id],
    (error,result) => {
        if (error) {
            console.log(error);
        }
        res.send({operations: result});
    })
})

router.get('/operations', (req,res) => {
    const id = req.session.user[0].id;
    db.query("SELECT type_of_operation, amount,operationID, operationDate, concept FROM records WHERE userID = ?", [id],
    (error,result) => {
        if (error) {
            console.log(error);
        }
        res.send({operations: result});
    })

})

router.delete('/operations',(req,res) => {
    const id = req.body.id;
    db.query("DELETE FROM records WHERE operationID = ?", [id], (err,result) => {
        if (err) {
            console.log(err);
        }
        res.send("Deleted");
    })
})

router.put('/operations',(req,res) => {
    const id = req.body.id;
    const amount = req.body.form.amount;
    const date = req.body.form.date;
    const concept = req.body.form.concept;
    
    db.query("UPDATE records SET amount = ?, operationDate = ?, concept = ? WHERE operationID = ?",
     [amount,date,concept,id]
    ,(err,result) => {
        if (err) {
            console.log(err);
        }
        res.send("changes done");

    })
})


module.exports = router;