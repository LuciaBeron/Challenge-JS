import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Records({operations}) {
    return (
        <table className="table">
            <thead className="bg-light-purple text-light">
                <tr>
                    <th colSpan="3">
                        <h4>Last records</h4>
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
