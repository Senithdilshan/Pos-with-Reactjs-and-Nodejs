import React, { useState , useRef } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { serverUrl } from '../../../Config';
import { useEffect } from "react";
import axios from "axios";
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';

export default function ViewLeaveNote() {

  const ref=useRef()
      
  const [leavenote, setleavenote] = useState([]);

  const fetchleavenote = () => {
    axios
      .get(`${serverUrl}/leavenote`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setleavenote(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchleavenote()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mt-3" >
      <h1 className="my-4 font-weight-bold-display-4">View Leave Notes</h1>
        <div>
        <div className="row">
        <div ref = {ref} className="col md-7" style={{
            height: '100%',
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">User Email</th>
                  <th scope="col">Leave Date</th>
                  <th scope="col">Reason</th>
                </tr>
              </thead>
              <tbody>
                {
                  leavenote.map(getl => (
                    <tr key={getl.id}>
                      <td>{getl.user_id}</td>
                      <td>{getl.name}</td>
                      <td>{getl.email}</td>
                      <td>{getl.date}</td>
                      <td>{getl.reason}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
        <div className="col">
         <ReactToPrint
          trigger={()=><button className='btn btn-primary mx-auto'>Print</button>}
          content={()=>ref.current}
          documentTitle='Leave Notes'
          pageStyle="print"
          />
          <Link to={'/viewuser'}>
                        <button className="back">Back</button>
                      </Link>
         </div>
         </div>
      </div>
    </>
  );
};
