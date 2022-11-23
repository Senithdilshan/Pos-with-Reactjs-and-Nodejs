import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import ReactToPrint from 'react-to-print';
import * as AiIcons from "react-icons/ai";
import { Center } from '@mantine/core';
import { serverUrl } from '../../../Config';



export default function ViewStock() {
  const navigate = useNavigate()
  const [batch, setBatches] = useState([]);
  const [remove, setdelete] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');

  // const [afterSearch, setafterSearch] = useState('')

  const fetch = () => {
    axios
      .get(`${serverUrl}/stock`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setBatches(res.data)
        setfilterdata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  //--------------------------------------------------------
  const deletestock = (bNo) => {
    axios
      .delete(`${serverUrl}/stock/` + bNo, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then((res) => {

        setdelete(res.data)

      })
      .catch((err) => console.log(err))
  }
  //-----------------------------------search-------------------------------
  const filter=(event)=>{
    const getsearch=event.target.value;
    setquery(getsearch);
    // console.log(getsearch);
    if(getsearch.length>0){
      const searchdata=batch.filter((item)=>item.productId.toLowerCase().includes(getsearch));
      setBatches(searchdata);
    }else
    {
      setBatches(filterdata);
    }
  }


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
{/* ------------------------------Search----------------------------------------------------------------- */}
          <div className="row">
            <h2 style={{ marginTop: 30,marginBottom:10, backgroundColor: "blue", color: "white",borderRadius:10,width:240,padding:5}}>Search In Stock</h2>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Search......"
              value={query}
              onChange={(e)=>filter(e)}
            />
          </div>
{/* //--------------------------------------------------------------------------------------------- */}
          <div className="row">
            <h2 style={{ backgroundColor: "blue", color: "white" ,marginTop:50, width:95,borderRadius:10,padding:5}}>Stock</h2>
          </div>
          <div className="row">
            <div className="col md-7" style={{
              height: 300,
              overflowY: 'scroll',
              marginTop: 5
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
                          <Link to={'/updatestock/' + getb.batchNo}>
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
