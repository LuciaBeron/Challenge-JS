import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {

    const [login, updateLogin] = useState({
        username: '',
        password: ''
    })

    const updateState = e => {
        updateLogin(
            {
                ...login,
                [e.target.name]: e.target.value
            }
        )
    }

    return (
 
        <div className="container">
            <section className="row d-flex justify-content-md-center align-items-center vh-100">
                <section className="col-xl-4 col-md-6 col-sm-12">
                    <form className="border border-primary rounded bg-light">
                        <div className="card-header bg-primary text-light text-center mb-3 p-3 h3">
                            LOGIN
                        </div>
                        <div className="m-3">
                            <div className="form-group mb-4">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input onChange={updateState} name="username" className="form-control bg-light" placeholder="Username"></input>                       
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input onChange={updateState} type="password" name="password" className="form-control bg-light" placeholder="Password"></input>
                            </div>
                            <div className="toolbar d-flex justify-content-around">
                                <button type="submit" className="btn btn-primary col-5">Sign in</button>
                                
                                <Link to="/register" className="btn btn-danger col-5">                                
                                    Register                                                     
                                </Link>
                                
                            </div>
                        </div>

                    </form>
                </section>
            </section>
        </div>
       

        
    );
}


