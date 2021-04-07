import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Operations() {

    const [operations, setOperations] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:3040/operations")
        .then(res => {
            setOperations(res.data.operations);
        })
    }, [])

    return (
        <table className="table w-50 mx-auto mt-5">
            <thead className="bg-light-purple text-light">
                <tr>
                    <th colSpan="3">
                        <h4>All operations</h4>
                    </th>
                </tr>                
            </thead>
                     
            <thead>
                <tr>
                <th scope="col">Amount</th>
                <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody>                    
                { 
                    operations.map(item => {
                        return (
                        <tr>
                        <td>{item.amount}</td>
                        <td>{item.type_of_operation}</td>                        
                        </tr>
                        )
                    })
                } 
            </tbody>
        </table>
    )
}

