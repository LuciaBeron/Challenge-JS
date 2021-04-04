import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Balance from './Balance';
import Records from './Records';


export default function Home() {
  
    return (
            <div className="container w-75 mt-4">
                <Balance />  
                <Records />          
            </div>
    )
}
