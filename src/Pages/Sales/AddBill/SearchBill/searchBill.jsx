import React from 'react'

export default function searchBill() {

  function SearchUsingInput() {
    var json = {
      "BillNo": "1",
      "Quantity": "1",
      "Price": "1",
      "Total": "1",
      "Paid": "1",
    };
    var input = document.getElementById("search").value;
    //check whether the input is name as Bill No
    if (input == json.BillNo) {
      //if the input is Bill No, then display the details in a table
      document.getElementById("table").innerHTML = "<tr><th>Bill No</th><th>Quantity</th><th>Price</th><th>Total</th><th>Paid</th></tr><tr><td>" + json.BillNo + "</td><td>" + json.Quantity + "</td><td>" + json.Price + "</td><td>" + json.Total + "</td><td>" + json.Paid + "</td></tr>";
    }else{
      //if the input is not Bill No, then display the message
      document.getElementById("table").innerHTML = "No Bill Found";
    }
  }
  return (
    <div className="container">
      <div class="input-group mb-3 mt-2">
          <input type="text" class="form-control" id="search" placeholder="Enter Bill Number" aria-label="Enter Bill Number" aria-describedby="basic-addon2" onChange={SearchUsingInput}/>
        </div>
        <div>
        </div>
        <table className="table" id="table">
          <div id="table"></div>

        </table>
        
    </div>
  )
}
