import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants/constants";
import { Link } from "react-router-dom";
const Adminhome = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, [])
    const getUsers = () => {
        axios({
            method: 'get',
            url: `${baseUrl}getusers`
        }).then(async (data) =>
            setUsers(data.data)
        )
    }
    const deleteUser = (id) => {
        console.log(id, "iddddddddddd");
        axios({
            method: 'delete',
            url: `${baseUrl}deleteuser/${id}`
        }).then((result) => {
            console.log(result.data, "rsuuuuuuuuuuuuuuu");
            if (result.data.deletedCount === 1) {
                alert("product deleted")
                getUsers();
            } else {
                alert("product already deleted")
            }
        })
    }

    const searchHandle = (event) => {
        let key = event.target.value;
        if (!key) {
            getUsers()
        } else {
            axios({
                method: 'get',
                url: `${baseUrl}adminsearch/${key}`
            }).then((result) => {
                if (result) {
                    setUsers(result.data)
                }
                console.warn(result.data, "oppp");
            })
        }

    }

    return (
        <div>
            <h2 className="text-center m-5">User Details</h2>
            <div className="input-group rounded">
                <input type="search" className="form-control rounded" placeholder="Search" onChange={searchHandle} />
            </div>
            <table className="table table-striped thead-dark mt-5">
                <thead class="thead-dark">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                {
                    users.length > 0 ? users.map((item, index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteUser(item._id)}>Delete</button>
                                <Link className="btn btn-outline-warning btn-sm ml-2" to={`/adminupdate/${item._id}`}>Edit</Link>
                            </td>
                        </tr>
                    )
                        :

                        <div>
                            <h3 className="text-danger mt-5">No Users Found</h3>
                        </div>

                }
            </table>

        </div>
    )
}

export default Adminhome;