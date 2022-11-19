import React, { useEffect, useState , useRef} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';



export default function ViewSupplier() {
  const ref=useRef()
  const [supplier, setSupplier] = useState([]);
  const fetch = () => {
    axios
      .get('http://localhost:5000/supplier')
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
            <Link to={'/addwarehouse'}>
              <button className="btn btn-secondary">Supplier Payments</button>
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
