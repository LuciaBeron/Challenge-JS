import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Balance from './Balance';
import Records from './Records';
import Axios from 'axios';

export default function Home() {

    Axios.defaults.withCredentials = true;

    const [operations, setOperations] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:3040/home")
        .then(res => {
            setOperations(res.data.operations);
        })
    }, [])
  
    return (
            <div className="container w-75 mt-4">
                <Balance />  
                <Records operations={operations} />          
                <h1></h1>
            </div>
    )
}
