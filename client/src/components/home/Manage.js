import React, { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Manage() {
    const [record, updateRecord] = useState(
        {
            type: '',
            amount: '',
            date: '',
            concept: ''
        }
    )
    const [newOperation,popForm] = useState(false);
    const openForm = () => {
        popForm(!newOperation);
    }

    const updateState = e => {
        updateRecord(
            {
                ...record,
                [e.target.name]: e.target.value
            }
        )
    }

    Axios.defaults.withCredentials = true;
    const addRecord = e => {
        e.preventDefault();
        Axios.post('http://localhost:3040/manage',
        {
            type: record.type,
            amount: record.amount,
            date: record.date,
            concept: record.concept
        })
    }
 
    return (
        <div className="container">  
            <div className="text-center mt-4">       
            <button className="btn btn-primary p-4" onClick={openForm}>
                New Operation +
            </button>
            </div>  
            <div className={newOperation ? "open" : "closed"}>
            <form className="form col-xl-4 col-md-6 col-sm-10 mx-auto mt-4 border border-dark p-3">
                
                <div className="card-header bg-purple text-light"><h3>New operation</h3></div>
                
                <div className="form-group mt-4">
                <label for="type" class="form-label">Type:</label>
                <input onChange={updateState} id="type" placeholder="deposit or withdrawal" className="form-control text-lowercase" name="type" type="text"></input>   
                
                </div>
                <div className="form-group">
                <label for="amount" class="form-label">Amount:</label>
                <input onChange={updateState} id="amount" placeholder="Amount" className="form-control" name="amount" type="number"></input>   
                </div>
                <div className="form-group">
                <label for="date" class="form-label">Date:</label>
                <input onChange={updateState} className="form-control" id="date" name="date" type="date"></input>
                </div>
                
                <div className="form-group">
                <label for="concept" class="form-label">Concept:</label>
                <input onChange={updateState} className="form-control" id="concept" name="concept" type="text"></input>
                </div>
                
                <button onClick={addRecord} className="btn btn-outline-primary w-100">Add</button>
                
            </form>  
            </div>    
        </div>
    )
}
