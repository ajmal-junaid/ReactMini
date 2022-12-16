import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrlAdmin } from "../constants/constants";
import axios from '../axios'
import './SignUp.css'
const UpdateUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        console.warn(params, "params")
        axios({
            method: 'get',
            url: `${baseUrlAdmin}update/${params.id}`
        }).then((result) => {
            console.log(result.data, "popopo");
            setName(result.data.name)
            setEmail(result.data.email)
        })
    }

    const formSubmit = () => {
        axios({
            method: 'put',
            url: `${baseUrlAdmin}update/${params.id}`,
            data: { name, email }
        }).then((result) => {
            console.log(result, "updatef succcesss");
            if (result) {
                navigate('/adminhome')
            } else {
                alert("no actions")
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
                                        <h2 className="text-uppercase text-center mb-5">Update User</h2>

                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example1cg" value={name} onChange={(e) =>
                                                setName(e.target.value)} className="form-control form-control-lg" />
                                            <label className="form-label" for="form3Example1cg">Your Name</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example3cg" value={email} onChange={(e) =>
                                                setEmail(e.target.value)
                                            } className="form-control form-control-lg" />
                                            <label className="form-label" for="form3Example3cg">Your Email</label>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="button" onClick={formSubmit}
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Update</button>
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
export default UpdateUser