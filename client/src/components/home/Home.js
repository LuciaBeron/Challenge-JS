import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Balance from './Balance';
import Records from './Records';
import Axios from 'axios';

export default function Home() {



    Axios.defaults.withCredentials = true;



  
    return (
            <div className="container w-75 mt-4">
                <Balance />  
                <Records />          
                <h1></h1>
            </div>
    )
}
