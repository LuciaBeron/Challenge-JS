import React, { useState, useEffect } from 'react';
import * as MdIcons from 'react-icons/md';

import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Operations() {

    const [operations, setOperations] = useState([])
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3040/operations")
        .then(res => {
            setOperations(res.data.operations);
        })
    }, [])

    const deleteOperation = (id) => {
        console.log("ID: ", id);
        console.log("About to delete lol");
        Axios.delete("http://localhost:3040/operations", {
            
            data:{
                id: id,
            }, 
            headers:{
                Authorization: "token"
            }
        
        })
    }

    return (
        <table className="table w-50 mx-auto mt-5">
            <thead className="bg-light-purple text-light">
                <tr>
                    <th colSpan="5">
                        <h4>All operations</h4>
                    </th>
                </tr>                
            </thead>
                     
            <thead>
                <tr>
                <th scope="col">Amount</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>                    
                { 
                    operations.map(item => {
                        return (
                        <tr key={item.operationID}>
                        <td>{item.amount}</td>
                        <td className="text-capitalize">{item.type_of_operation}</td>       
                        <td>{(item.operationDate.split("T"))[0]}</td>                              
                        <td><MdIcons.MdDelete onClick={() => {deleteOperation(item.operationID)}} /></td>
                        <td><MdIcons.MdEdit /></td>
                              
                        </tr>
                        )
                    })
                } 
            </tbody>
            
        </table>
    )
}

