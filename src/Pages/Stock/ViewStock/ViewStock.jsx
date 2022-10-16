import React from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
export default function ViewStock() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
            <div className="col">
              <Link to={'/addstock'}>
                <button className="btn btn-secondary">Add New Product</button>
              </Link>
            </div>
            <div className="col">
              <Link to={'/addwarehouse'}>
                <button className="btn btn-secondary">Add New Warehouse</button>
              </Link>
            </div>
            <div className="col">
              <Link to={'/addbatch'}>
                <button className="btn btn-secondary">Add Batch Detalis</button>
              </Link>
            </div>
            <div className="col">
              <Link to={'/addtostock'}>
                <button className="btn btn-secondary">Add Products to Stock</button>
              </Link>
            </div>
          </div>
        <div className="row"></div>
      </div>
    </>
  )
}
