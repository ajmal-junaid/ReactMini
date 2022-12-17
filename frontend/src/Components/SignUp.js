import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from 'react-router-dom';
import { userLogin } from "../redux/username"

import axios from '../axios'
import './SignUp.css'
const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formSubmit = () => {
        if (!name || !email || !password) {
            setError(true)
            return false
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/register',
            data: {
                name,
                email,
                password
            }
        }).then((res) => {
            localStorage.setItem("usertoken", JSON.stringify(res.data.token))
            localStorage.setItem("auth", JSON.stringify(res.data.auth))
            dispatch(userLogin({ userData: email }))
            console.log(res.data, "responseeeeeeeeeee signupo");
            navigate('/')

        }

        )
        console.warn(name, email, password)
    }
    return (
        <div>
            <section className="vh-100 bg-image container-fluid">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6 py-5">
                                <div className="card">
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                        <form>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="form3Example1cg" value={name} onChange={(e) =>
                                                    setName(e.target.value)} className="form-control form-control-lg" />
                                                <label className="form-label" for="form3Example1cg">Your Name</label>
                                                {error && !name && <p className="text-danger d-block">Enter valid name</p>}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="email" id="form3Example3cg" value={email} onChange={(e) =>
                                                    setEmail(e.target.value)
                                                } className="form-control form-control-lg" />
                                                <label className="form-label" for="form3Example3cg">Your Email</label>
                                                {error && !email && <p className="text-danger d-block">Enter valid Email</p>}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form3Example4cg" value={password} onChange={(e) =>
                                                    setPassword(e.target.value)
                                                } className="form-control form-control-lg" />
                                                <label className="form-label" for="form3Example4cg">Password</label>
                                                {error && !password && <p className="text-danger d-block">Enter valid Password</p>}
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="button" onClick={formSubmit}
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                                                className="fw-bold text-body"><u><Link to='/login' >Login here</Link></u></a></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default SignUp