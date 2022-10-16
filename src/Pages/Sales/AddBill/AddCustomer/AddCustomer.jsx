import React, { useState } from 'react';
import Navbar from '../../../../Components/Navbar'


export default function AddCustomer() {
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const searchUser=()=>{
        console.log("Mobile Phone is:",phone +"Address is:",address+"Name is:",name);
        console.log("searching user");
       
    }
  return (
  <div>
        <Navbar />
    <div className="container">
        <div className="row">
            <div className="col-sm">
        <h1>Add Customer</h1>
        <form action="" method="post">
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" className="form-control" id="phone" placeholder="Enter Phone" 
                    onChange={(e) => setPhone(e.target.value)
                }/>
                <button type="button" className="btn btn-primary mt-1" onClick={searchUser}>Search</button>
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Name" 
                    onChange={(e)=>setAddress(e.target.value) 
                }/>
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Enter Address" 
                    onChange={(e)=>setName(e.target.value)
                }/>
            </div>
            <button type="submit" className="btn btn-warning mt-2">Reg Customer</button>
        </form>
        </div>
        
        <button type="button" class="btn btn-danger btn-lg btn-block mt-2 float-right">Finish</button>
        </div>

    </div>
    </div>

  )
}
