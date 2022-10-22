import React, { useEffect, useState , useRef} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactToPrint from 'react-to-print';



export default function ViewStock() {
  const ref=useRef()
  const [batch, setBatches] = useState([]);
  const fetch = () => {
    axios
      .get('http://localhost:5000/stock')
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
        <div ref={ref} className="row">
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
                      </tr>
                    ))
                  }

                </tbody>
              </table>
          </div>
        </div>
        <div className="row">
         <div className="col">
         <ReactToPrint
          trigger={()=><button className='btn btn-primary mx-auto'>Print</button>}
          content={()=>ref.current}
          documentTitle='New document'
          pageStyle="print"
          />
         </div>
        </div>
      </div>
    </>
  )
}
