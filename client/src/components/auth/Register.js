import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';



export default function Register() {

    

    const [reg, updateRegister] = useState({
        username: '',
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
        console.log(reg);
    }

    const [error, setError] = useState(false);

    const validateForm = e => {
        const { username, password, email } = reg;
        if (username === '' || password === '' || email === '') {
            e.preventDefault();
            setError(true);
        }
    }


    const register = e => {
        e.preventDefault();
        Axios.post('http://localhost:3040/register', 

        {
          username:reg.username, 
          password:reg.password, 
          email:reg.email
        })
        .then((res) => {
            console.log(res);
        
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
                                <label htmlFor="username" className="form-label">Username</label>
                                <input onChange={updateState} name="username" className="form-control bg-light" placeholder="Username"></input>                       
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input onChange={updateState} name="email" className="form-control bg-light" placeholder="Email"></input>                       
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input onChange={updateState} name="password" className="form-control bg-light" type="password" placeholder="Password"></input>
                            </div>
                            
                            {error && <div className="alert alert-danger" role="alert">All fields must be filled.</div>}

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


