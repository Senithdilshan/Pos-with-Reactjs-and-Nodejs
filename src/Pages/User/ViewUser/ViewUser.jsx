import React, { useEffect, useState , useRef} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as AiIcons from "react-icons/ai";
import { serverUrl } from '../../../Config';
import moment from "moment"

export default function ViewUser() {
  const ref=useRef()
  const [user, setUser] = useState([]);
  const [remove, setdelete] = useState([]);

  const deleteUser = (user_id) => {
    axios
      .delete(`${serverUrl}/user/` + user_id,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })
      .then((res) => {

        setdelete(res.data)

      })
      .catch((err) => console.log(err))
  }

  const fetch = () => {
    axios
      .get(`${serverUrl}/user` , {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <Link to={'/adduser'}>
              <button className="btn btn-secondary">Add New User</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/adduserreview'}>
              <button className="btn btn-secondary">Add user Review</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/viewuserreview'}>
              <button className="btn btn-secondary">Add Leave Note</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/viewuserreview'}>
              <button className="btn btn-secondary">View Leave Notes</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/viewuserreview'}>
              <button className="btn btn-secondary">View User Reviews</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/userlogreport'}>
              <button className="btn btn-secondary">User Log Report</button>
            </Link>
          </div>
        </div>
        <div ref={ref} className="row">
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 105
          }}>
              <table className="table table-striped table-dark">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User Email</th>
                    <th scope="col">Mobile Number</th>
                    <th scope='col'>User Role</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Date Of Birth</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    user.map(getu => (
                      <tr key={getu.id}>
                        <td>{getu.user_id}</td>
                        <td>{getu.name}</td>
                        <td>{getu.email}</td>
                        <td>{getu.mobileNo}</td>
                        <td>{getu.userLevel}</td>
                        <td>{getu.address}</td>
                        <td>{moment.utc(getu.DOB).format('DD/MM/YYYY')}</td>
                        <td>
                          <Link to={'/updateuser/'+getu.user_id}>
                            <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                          </Link>
                        </td>
                        <td>
                          <Link to={'/viewuser'}>
                            <button className="btn btn-danger"
                              onClick={() => {
                                deleteUser(getu.user_id)
                                window.alert('User Deleted Successfully')
                                fetch()
                              }}
                            ><AiIcons.AiFillDelete /></button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  )
}
