import React, { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Manage() {

    const [record, updateRecord] = useState(
        {
            type: '',
            amount: '',
            date: ''
        }
    )

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
            date: record.date
        })
        .then((res) => {
            console.log(res);
        })
    }


    return (
        <div>            

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
                <button onClick={addRecord} className="btn btn-outline-primary w-100">Add</button>
                
            </form>      
        </div>
    )
}
