/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../redux/username"
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const userdata = useSelector((state) => state.userdata.value);
  const auth = localStorage.getItem("usertoken");
  const admauth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    let token = localStorage?.getItem('usertoken')
    if (token) {
      let { user } = jwt_decode(token);
      let { name, email } = user
      console.log(user, "next oneeeeeeeee", name, email);
      dispatch(userLogin({ userData: name }))
    }

  }, [])

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand text-white">
            <strong className="text-primary">
              {admauth ? "Admin Dashboard" : "" || auth ? "User Dash" : ""}
            </strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/update">
                    Update
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </ul>
            ) : (
              <>
                <span className="navbar-text ml-auto">
                  {" "}
                  <Link className="nav-link" to="/signup">
                    SignUp
                  </Link>{" "}
                </span>
                <span className="navbar-text">
                  {" "}
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>{" "}
                </span>
              </>
            )}
            {auth ? (
              <span className="navbar-text">
                {" "}
                <Link className="nav-link" onClick={logout} to="/">
                  Logout ( <b className="text-danger">{userdata}</b> )
                </Link>{" "}
              </span>
            ) : (
              <></>
            )}

            <span className="navbar-text"></span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
