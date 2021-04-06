import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

export default function Login() {

    const [login, updateLogin] = useState({
        username: '',
        password: ''
    })

    const [status, setLoginStatus] = useState('');

    const updateState = e => {
        updateLogin(
            {
                ...login,
                [e.target.name]: e.target.value
            }
        )
    }

    const loginAccount = e => {
        e.preventDefault();
        Axios.post('http://localhost:3040/login', 
        {
          username:login.username, 
          password:login.password
        })
        .then((res) => {
            if (res.data.message) {
                setLoginStatus(res.data.message);
            } else {
                setLoginStatus('');
            }
                   
        });
    }; 

    return (
 
        <div className="container">
            <section className="row d-flex justify-content-md-center align-items-center vh-100">
                <section className="col-xl-4 col-md-6 col-sm-12">
                    <form className="border-purple rounded bg-light">
                        <div className="card-header bg-purple text-light text-center mb-3 p-3 h3">
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

                            {status && <div className="alert alert-danger">{status}</div>}

                            <div className="toolbar d-flex justify-content-around">
                                <button onClick={loginAccount} type="submit" className="btn bg-purple text-light col-5">
                                    Sign in
                                </button>
                                
                                <Link to="/register" className="btn text-light bg-primary col-5">                                
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


