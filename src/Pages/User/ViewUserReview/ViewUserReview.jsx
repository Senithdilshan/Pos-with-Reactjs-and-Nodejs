import React, { useState , useRef } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { serverUrl } from '../../../Config';
import { useEffect } from "react";
import axios from "axios";
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import moment from "moment"

export default function ViewUserReview() {

  const ref=useRef()
      
  const [userreview, setuserreview] = useState([]);

  const fetchuserreview = () => {
    axios
      .get(`${serverUrl}/userreview`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setuserreview(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchuserreview()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mt-3" >
      <h1 className="my-4 font-weight-bold-display-4">View User Reviews</h1>
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
                  <th scope="col">Rating</th>
                  <th scope="col">Description</th>
                  <th scope="col">Added Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  userreview.map(getr => (
                    <tr key={getr.id}>
                      <td>{getr.user_id}</td>
                      <td>{getr.name}</td>
                      <td>{getr.rating}</td>
                      <td>{getr.description}</td>
                      <td>{moment.utc(getr.createdAt).format('DD/MM/YYYY')}</td>
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
          documentTitle='Print Reviews'
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
