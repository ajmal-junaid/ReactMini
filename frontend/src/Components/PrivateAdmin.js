import React from "react";
import { Navigate,Outlet } from "react-router-dom";

const PrivateAdmin =()=>{
    const auth = localStorage.getItem('admin')
    console.log(auth,"authhhh");
    return auth ? <Outlet/> : <Navigate to="adminlogin"/>
}
export default PrivateAdmin;