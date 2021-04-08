import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';

 

export default function Register() {

    const [reg, updateRegister] = useState({
        password: '',
        email: ''
    })

    const updateState = e => {
        updateRegister(
            {
                ...reg,
                [e.target.name]: e.target.value
            }
        )
    }

    const [error, setError] = useState('');

    const validateForm = e => {
        const { password, email } = reg;
        if ( password === '' || email === '') {
            e.preventDefault();
            setError(true);
        }
    }


    const register = e => {
        e.preventDefault();
        Axios.post('http://localhost:3040/register', 

        {
          password:reg.password, 
          email:reg.email
        })
        .then((res) => {
            setError(res.data.message);
   
        });


        

    }; 

    return (
 
        <div className="container">
            <section className="row d-flex justify-content-md-center align-items-center vh-100">
                <section className="col-xl-4 col-md-6 col-sm-12">
                    <form onSubmit={validateForm} className="border-purple rounded bg-light">
                        <div className="card-header bg-purple text-light text-center mb-3 p-3 h3">
                            REGISTER
                        </div>
                        <div className="m-3">

                            <div className="form-group mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input onChange={updateState} name="email" className="form-control bg-light" placeholder="Email"></input>                       
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input onChange={updateState} name="password" className="form-control bg-light" type="password" placeholder="Password"></input>
                            </div>
                            
                            {error === '' ? null : <div className="alert alert-danger" role="alert">{error}</div>}
                            

                                <button onClick={register} className="btn text-light bg-purple col-12 p-2 mb-2">
                                    Register
                                </button>
                                <Link to="/login" className="btn btn-primary col-12 p-2 text-light" style={{textDecoration:'none'}}>
                                    Login
                                </Link>
                              
                        </div>

                    </form>
                </section>
            </section>
        </div>
       

        
    );
}


