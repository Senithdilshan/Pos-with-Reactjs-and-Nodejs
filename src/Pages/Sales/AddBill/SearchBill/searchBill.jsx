import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../../../../Config';

export default function SearchBill() {
    const [bill, setBill] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(serverUrl+ '/sale/');
        setBill(result.data);
      }
      fetchData();
    }, []);

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
    
  
  return (
    <div className="container">
      <div className="input-group mb-3 mt-2">
          <input type="text" className="form-control" id="myInput" onKeyUp={myFunction} placeholder="Enter Bill Number" aria-label="Enter Bill Number" aria-describedby="basic-addon2" />
        </div>
    <table id="myTable" class='table' >
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Discount</th>
          <th>Price</th>
          </tr>
      </thead>
      <tbody>
        {bill.map((bill) => (
          <tr key={bill.saleId}>
            <td>{bill.customerId}</td>
            <td>{bill.productId}</td>
            <td>{bill.quantity}</td>
            <td>{bill.discount}</td>
            <td>{bill.price}</td>
            </tr>
        ))}
      </tbody>


      </table>
      {/* back button */}
      <div className="row">
        <div className="col-12">
          <button className="btn btn-primary float-right" onClick={() => window.history.back()}>Back</button>
          </div>
          </div>
    </div>
  )
}
