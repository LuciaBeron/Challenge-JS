import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Records() {
    return (
        <table class="table">
            <thead className="bg-light-purple text-light">
                <tr>
                    <th colspan="3">
                        <h4>Last records</h4>
                    </th>
                </tr>                
            </thead>
                     
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Amount</th>
                <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                </tr>
            </tbody>
        </table>
    )
}
