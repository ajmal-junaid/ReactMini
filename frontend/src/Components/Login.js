import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogin } from "../redux/username"
import Swal from "sweetalert2";
import './LoginUser.css'
import axios from '../axios'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      navigate('/')

    }
  }, [])
  const FormSubmit = () => {
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
        dispatch(userLogin({ userData: email }))
        localStorage.setItem("usertoken", JSON.stringify(response.data.token))
        localStorage.setItem("auth", JSON.stringify(response.data.auth))

        navigate('/')
      } else {
        console.log(response.data, "kkkkkkkkkkkkkkkkkkkk");
        Swal.fire(
          'Error?',
          response.data.message,
          'question'
        )
      }
    })

  }
  return (
    <div>
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer">
              <div
                className="box-root flex-flex"
                style={{ gridArea: "top / start / 8 / end" }}
              >
                <div
                  className="box-root"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                    flexGrow: 1
                  }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 2 / auto / 5" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "6 / start / auto / 2" }}
              >
                <div
                  className="box-root box-background--blue800"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "7 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--blue animationLeftRight"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "8 / 4 / auto / 6" }}
              >
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "2 / 15 / auto / end" }}
              >
                <div
                  className="box-root box-background--cyan200 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "3 / 14 / auto / end" }}
              >
                <div
                  className="box-root box-background--blue animationRightLeft"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 17 / auto / 20" }}
              >
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "5 / 14 / auto / 17" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
            </div>
          </div>
          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>
                <a rel="dofollow" className='text-dark w-25'>
                  Login Page
                </a>
              </h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">Sign in to your account</span>

                  <div className="field padding-bottom--24">
                    <label htmlFor="email">Email</label>
                    {error && !email && <p className="text-danger d-block">Enter valid Email</p>}
                    <input type="email" name="email" value={email} onChange={(e) =>
                      setEmail(e.target.value)
                    } />

                  </div>
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">Password</label>

                    </div>
                    <input type="password" name="password" value={password} onChange={(e) =>
                      setPassword(e.target.value)
                    } />
                    {error && !password && <p className="text-danger d-block">Enter valid password</p>}
                  </div>
                  <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                    <label htmlFor="checkbox">
                      <input type="checkbox" name="checkbox" /> Stay signed in for a
                      week
                    </label>
                  </div>
                  <div className="field padding-bottom--24">
                    <input type="button" name="submit" defaultValue="Login" onClick={FormSubmit} />
                  </div>

                </div>
              </div>
              <div className="footer-link padding-top--24">
                <span>
                  Don't have an account? <Link className="nav-link" to="/signup">
                    Sign-Up
                  </Link>
                </span>
                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login