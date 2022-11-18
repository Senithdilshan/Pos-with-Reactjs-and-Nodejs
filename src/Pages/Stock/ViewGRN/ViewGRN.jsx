import React, { useEffect, useState , useRef} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactToPrint from 'react-to-print';



export default function ViewStock() {
  const ref=useRef()
  const [grn, setGrn] = useState([]);
  const fetch = () => {
    axios
      .get('http://localhost:5000/grn')
      .then(res => {
        // console.log(res)
        setGrn(res.data)
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
           <h1>Goods Recive Notes</h1>
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
                  <th scope="col">GRN ID</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Warehouse ID</th>
                    <th scope="col">Supplier ID</th>
                    <th scope="col">Batch Number</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Buy (Rs.)</th>
                    <th scope="col">Added Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    grn.map(getb => (
                      <tr key={getb.id}>
                        <td>{getb.grnID}</td>
                        <td>{getb.productId}</td>
                        <td>{getb.warehouseID}</td>
                        <td>{getb.supplierID}</td>
                        <td>{getb.batchNo}</td>
                        <td>{getb.quantity}</td>
                        <td>{getb.totalBuyingPrice}</td>
                        <td>{getb.createdAt}</td>
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
         <div className="col">
            <Link to={'/stock'}>
              <button className='btn btn-danger mx-auto'>Back</button>
            </Link>
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          
          
        </div>
      </div>
    </>
  )
}
