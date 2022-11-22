import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import ReactToPrint from 'react-to-print';
import * as AiIcons from "react-icons/ai";



export default function ViewStock() {
  const navigate = useNavigate()
  const [batch, setBatches] = useState([]);
  const [remove, setdelete] = useState([]);

  const deletestock = (bNo) => {
    axios
      .delete("http://localhost:5000/stock/" + bNo,{
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
      .get('http://localhost:5000/stock',{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setBatches(res.data)
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
            <Link to={'/addstock'}>
              <button className="btn btn-secondary">Add New Product to Shop</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addwarehouse'}>
              <button className="btn btn-secondary">Add New Warehouse to Shop</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addbatch'}>
              <button className="btn btn-secondary">Add New Batch Detalis</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addtostock'}>
              <button className="btn btn-secondary">Add Products to Stock</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/viewgrns'}>
              <button className="btn btn-success">View GRNs and Print</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/outofstock'}>
              <button className="btn btn-danger">Out of stock Product List</button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/batchexpired'}>
              <button className="btn btn-danger">Expired Batches in Stocks</button>
            </Link>
          </div>
          <div className="row">
            <div className="col md-7" style={{
              height: 300,
              overflowY: 'scroll',
              marginTop: 105
            }}>
              <table className="table table-striped table-dark">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Warehouse</th>
                    <th scope="col">Batch Number</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Buying Price (Rs.)</th>
                    <th scope="col">Selling Price (Rs.)</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    batch.map(getb => (
                      <tr key={getb.id}>
                        <td>{getb.productId}</td>
                        <td>{getb.warehouseID}</td>
                        <td>{getb.batchNo}</td>
                        <td>{getb.quantity}</td>
                        <td>{getb.buyingPrice}</td>
                        <td>{getb.sellingPrice}</td>
                        <td>
                          <Link to={'/updatestock/'+getb.batchNo}>
                            <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                          </Link>
                        </td>
                        <td>
                          <Link to={'/stock'}>
                            <button className="btn btn-danger"
                              onClick={() => {
                                deletestock(getb.batchNo)
                                // window.confirm('Are you sure to delete this stock')
                                window.alert('stock Deleted Sucessfully')
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
      </div>
    </>
  )
}
