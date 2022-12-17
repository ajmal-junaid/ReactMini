




import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../constants/constants';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './Profile.css'

function Profile() {
    const userdata = useSelector((state) => state.userdata.value);
    const { register, handleSubmit, setValue } = useForm()
    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('image', data.image)
        axios.post(`${baseUrl}profile`, formData).then((response) => {
            console.log(response, "profile component");
        })
    }
    

    const handleChange = (event) => {
        setValue('image', event.target.files[0]);
    }
    const [image, setImage] = useState(null);
    //const navigate = useNavigate()
    //const date = new Date();

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-9 col-lg-7 col-xl-12">
                            <div className="card col-12" style={{ borderRadius: 15 }}>
                                <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={image ? URL.createObjectURL(image) : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
                                                alt="Generic placeholder image"
                                                className="img-fluid"
                                                style={{ width: 180, borderRadius: 10 }}
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3 pl-4">
                                            <h5 className="mb-1 pl-3">{userdata}</h5>
                                            <p className="mb-2 p-2" style={{ color: "#2b2a2a" }}>
                                                Software Engineer
                                            </p>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div
                                                    className="d-flex rounded-3 p-2 mb-2 row"
                                                    style={{ backgroundColor: "#efefef" }}
                                                >

                                                    <div className='col-2'>
                                                        <input className="small text-muted mb-1" name='image' ref={register} type="file" onChange={handleChange} />
                                                    </div>


                                                </div>
                                                <div className="d-flex pt-1">

                                                    <button type='submit' className="btn btn-primary flex-grow-1">
                                                        Upload Image                                                </button>
                                                </div>
                                            </form>
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

export default Profile