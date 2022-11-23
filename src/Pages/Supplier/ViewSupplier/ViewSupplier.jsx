import React, { useEffect, useState , useRef} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as AiIcons from "react-icons/ai";



export default function ViewSupplier() {
  const ref=useRef()
  const [supplier, setSupplier] = useState([]);
  const [remove, setdelete] = useState([]);

  const deleteSupplier = (supplierId) => {
    axios
      .delete("http://localhost:5000/supplier/" + supplierId,{
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
      .get('http://localhost:5000/supplier' , {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setSupplier(res.data)
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
            <Link to={'/addsupplier'}>
              <button className="btn btn-secondary">Add New Supplier</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addsupplierpayment'}>
              <button className="btn btn-secondary">Add Supplier Payments</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addbatch'}>
              <button className="btn btn-secondary">Supplier Payment Report</button>
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
                    <th scope="col">Supplier ID</th>
                    <th scope="col">Supplier Name</th>
                    <th scope="col">Supplier Address</th>
                    <th scope="col">Supplier Contact Number</th>
                    <th scope='col'>Supplier Outstanding Amount</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    supplier.map(gets => (
                      <tr key={gets.id}>
                        <td>{gets.supplierId}</td>
                        <td>{gets.supplierName}</td>
                        <td>{gets.supplierAddress}</td>
                        <td>{gets.supplierContactNumber}</td>
                        <td>{gets.outstandingAmount}</td>
                        <td>
                          <Link to={'/updatesupplier/'+gets.supplierId}>
                            <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                          </Link>
                        </td>
                        <td>
                          <Link to={'/viewsupplier'}>
                            <button className="btn btn-danger"
                              onClick={() => {
                                deleteSupplier(gets.supplierId)
                                window.alert('Supplier Deleted Successfully')
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
