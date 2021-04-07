import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css'

export default function Login() {

    let history = useHistory();

    const [login, updateLogin] = useState({
        email: '',
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

    Axios.defaults.withCredentials = true;
    const loginAccount = e => {
        e.preventDefault();
        Axios.post('http://localhost:3040/login', 
        {
          email:login.email, 
          password:login.password
        })
        .then((res) => {
            if (res.data.message) {
                setLoginStatus(res.data.message);
            } else {
                history.push("/home");
            }
        });
    }; 

    useEffect(() => {
        Axios.get("http://localhost:3040/login")
        .then(res => {
            console.log(res);
            if (res.data.loggedIn === true) {
                console.log(res.data.loggedIn === true);
                history.push("/home");
            }
        })
    })


    
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
                                <label htmlFor="email" className="form-label">Email</label>
                                <input onChange={updateState} name="email" className="form-control bg-light" placeholder="Email"></input>                       
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


