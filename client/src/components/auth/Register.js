import React, { useState } from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Register() {

    const [login, updateRegister] = useState({
        username: '',
        password: '',
        email: ''
    })

    const updateState = e => {
        updateRegister(
            {
                ...login,
                [e.target.name]: e.target.value
            }
        )
    }

    const [error, setError] = useState(false);

    const validateForm = e => {
        const { username, password, email } = login;
        if (username == '' || password == '' || email == '') {
            e.preventDefault();
            setError(true);
        }
    }

    return (
 
        <div className="container">
            <section className="row d-flex justify-content-md-center align-items-center vh-100">
                <section className="col-xl-4 col-md-6 col-sm-12">
                    <form onSubmit={validateForm} className="border border-danger rounded bg-light">
                        <div className="card-header bg-danger text-light text-center mb-3 p-3 h3">
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
                            
                            {error && <div className="alert alert-danger" role="alert">
                                All fields must be filled.</div>}

                                <button className="btn btn-danger col-12 p-2 mb-2">Register</button>
                                <div className="btn btn-primary col-12 p-2">
                                    <Link to="/" className="text-light" style={{textDecoration:'none'}}>Login</Link>
                                </div>
                        </div>

                    </form>
                </section>
            </section>
        </div>
       

        
    );
}


