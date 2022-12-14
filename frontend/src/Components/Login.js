import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import {useDispatch,useSelector} from 'react-redux'
//import {actions} from '../globalState/index'
import './SignUp.css'
import axios from '../axios'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate()
  //const user = useSelector((data)=>data)
  //console.log(user,"userrr");
  //const dispatch = useDispatch();
  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const formSubmit = () => {
    if (!email || !password) {
      setError(true)
      return false
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        email,
        password
      }
    }).then((response) => {
      
      if (response.data.auth) {
        console.log(response.data, "responseeeeeeeeeloginnnnn");
        localStorage.setItem("usertoken", JSON.stringify(response.data.token))
        localStorage.setItem("auth", JSON.stringify(response.data.auth))
        navigate('/')
      } else {
        console.log(response.data, "kkkkkkkkkkkkkkkkkkkk");
        alert(response.data)
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
                    <h2 className="text-uppercase text-center mb-5">Login Page</h2>

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
                      {error && !password && <p className="text-danger d-block">Enter valid password</p>}
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="button" onClick={formSubmit}
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Don't have an account? <a href="#!"
                      className="fw-bold text-body"><u>SignUp here</u></a></p>
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

export default Login