import React from 'react'
import axios from 'axios'
import { serverUrl } from '../../../../Config';

export default function searchBill() {

  function SearchUsingInput() {
   
    var input = document.getElementById("search").value;
    axios.get(`${serverUrl}/sale/`)
      .then(res => {
        var data = res.data;
        for (var i=0 ; i<data.length ; i++){
          if (data[i].saleId == input){
            document.getElementById("table").innerHTML = "<tr><th>Bill No</th><th>Quantity</th><th>Price</th><th>Total</th><th>Paid</th></tr><tr><td>" + data[i].saleId + "</td><td>" + data[i].quantity + "</td><td>" + data[i].price + "</td><td>" + data[i].netAmount + "</td><td>" + data[i].totalAmount + "</td></tr>";
            document.getElementById("date").innerHTML = data[i].saleDate;
            break;
          }else
          {
            document.getElementById("table").innerHTML = "No Bill Found";
            document.getElementById("date").innerHTML = "";
          }
        }
      }
      )
  }
    
  
  return (
    <div className="container">
      <div className="input-group mb-3 mt-2">
          <input type="text" className="form-control" id="search" placeholder="Enter Bill Number" aria-label="Enter Bill Number" aria-describedby="basic-addon2" onChange={SearchUsingInput}/>
        </div>
        <div>
        </div>
        <table className="table" id="table">
          <div id="table"></div>

        </table>
        {/* Print the date */}
        <div id='date'></div>              
    </div>
  )
}
