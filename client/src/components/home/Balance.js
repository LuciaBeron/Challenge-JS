import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';


export default function Balance() {

    const [balance, setBalance] = useState(0);

    Axios.defaults.withCredentials = true;
    useEffect(() =>{
        Axios.get("http://localhost:3040/balance")
        .then(res => {
            setBalance(res.data.balance);
        })
    }, [])


    return (
            
        <div>
                <section className="row">
                    <div className="card text-white mb-3">
                        <div className="card-header bg-purple">
                            <h3>
                                Account Balance
                            </h3>
                        </div>
                        <div className="card-body">
                            <p className="card-text text-dark">
                                <h1 className="text-center">
                                    {balance}
                                </h1>
                            </p>
                        </div>
                    </div>
                </section> 
                  
                <hr></hr>            
        </div>
    )
}
