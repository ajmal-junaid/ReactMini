import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import '../constants/constants'
import { baseUrlAdmin } from "../constants/constants";
const Admlogin = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const formSubmit = () => {
        if (!username || !password) {
            setError(true)
            return false
        }
        axios({
            method: 'post',
            url: `${baseUrlAdmin}login`,
            data: {
                username,
                password
            }
        }).then((respo) => {
            console.log(respo.data, "opopopo");
            if (respo.data.admin) {
                localStorage.setItem("admin", JSON.stringify(respo.data))
                navigate('/adminhome')
            }
        })
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
                                        <h2 className="text-uppercase text-center mb-5">Admin Login</h2>

                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example3cg" value={username} onChange={(e) =>
                                                setUserName(e.target.value)
                                            } className="form-control form-control-lg" />
                                            <label className="form-label" for="form3Example3cg">Your Email</label>
                                            {error && !username && <p className="text-danger d-block">Enter valid Email</p>}
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4cg" value={password} onChange={(e) =>
                                                setPassword(e.target.value)
                                            } className="form-control form-control-lg" />
                                            <label className="form-label" for="form3Example4cg">Password</label>
                                            {error && !password && <p className="text-danger d-block">Enter valid password</p>}
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="button" onClick={formSubmit}
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                                        </div>
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

export default Admlogin;