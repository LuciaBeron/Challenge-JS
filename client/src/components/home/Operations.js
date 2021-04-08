import React, { useState, useEffect } from 'react';
import * as MdIcons from 'react-icons/md';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Operations() {
 
    const [edit, setEdit] = useState(false);
    const [operations, setOperations] = useState([])
    const [id, setId] = useState(0);
    const [form, updateForm] = useState({
        amount: '',
        date: ''
    })
    const updateState = e => {
        updateForm({
            ...form,
            [e.target.name]: e.target.value
        }
        )
    }
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3040/operations")
        .then(res => {
            setOperations(res.data.operations);
        })
    },[])

    const deleteOperation = (id) => {
        Axios.delete("http://localhost:3040/operations", {
            data:{
                id: id,
            }, 
            headers:{
                Authorization: "token"
            }
        })
        .then(res => {
            window.location.reload();
        })
    }
    const editOperation = (id) => {
        setEdit(!edit);
        setId(id);
    }


    const changeRecord = e => {
        Axios.put("http://localhost:3040/operations", {id: id, form}).then((res) => {
            window.location.reload();
        })
    }

    return (
        <div>
    
        <table className="table w-75 mx-auto mt-5">
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
                        <td>
                            <MdIcons.MdDelete 
                                role="button" 
                                onClick={() => {deleteOperation(item.operationID)}} 
                            />
                        </td>
                        <td>
                            <MdIcons.MdEdit 
                                role="button"
                                onClick={() => {editOperation(item.operationID)}} 
                            />
                        </td>
                        </tr>

                        )
                        
                    })
                } 
            </tbody>
            </table>

            <div className={edit ? 'active-form modal' : 'closed'}>
            <form className="modal-content form col-xl-4 col-md-6 col-sm-10 mx-auto mt-4 border border-dark p-3">
                <div className="card-header bg-info mb-2">Edit operation</div>
                <div className="form-group">
                <label for="amount" class="form-label">Amount:</label>
                <input onChange={updateState} id="amount" placeholder="Amount" className="form-control" name="amount" type="number"></input>   
                </div>
                <div className="form-group">
                <label for="date" class="form-label">Date:</label>
                <input onChange={updateState} className="form-control" id="date" name="date" type="date"></input>
                </div>
                <div onClick={changeRecord} className="btn btn-outline-primary w-100">Change</div>
                <div onClick={editOperation} className="btn btn-outline-danger w-100">Close</div> 
                
            </form>   
            </div> 
            </div>
    )

}
