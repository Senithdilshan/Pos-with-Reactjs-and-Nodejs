import React from 'react'

export default function searchBill() {

  function SearchUsingInput() {
    var json = 
      [
        {
          "BillNo": "1",
          "Quantity": "1",
          "Price": "1",
          "Total": "1",
          "Paid": "1"
        },
        {
          "BillNo": "200003",
          "Quantity": "1",
          "Price": "1",
          "Total": "1",
          "Paid": "1"
        },
        {
          "BillNo": "30001",
          "Quantity": "1",
          "Price": "1",
          "Total": "1",
          "Paid": "1"
        },
        {
          "BillNo": "40001",
          "Quantity": "1",
          "Price": "1",
          "Total": "1",
          "Paid": "1"
        }

      ];
    var input = document.getElementById("search").value;
      for(var i=0;i<json.length;i++){
       if (input === json[i].BillNo) {
         document.getElementById("table").innerHTML = "<tr><th>Bill No</th><th>Quantity</th><th>Price</th><th>Total</th><th>Paid</th></tr><tr><td>" + json[i].BillNo + "</td><td>" + json[i].Quantity + "</td><td>" + json[i].Price + "</td><td>" + json[i].Total + "</td><td>" + json[i].Paid + "</td></tr>";
         break;

        }else{
          document.getElementById("table").innerHTML = "No Bill Found";
        }
      }
    
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
        
    </div>
  )
}
