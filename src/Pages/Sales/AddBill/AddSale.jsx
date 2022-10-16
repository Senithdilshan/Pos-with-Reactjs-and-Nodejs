import React from 'react'
import AddProduct from './AddProduct/addProduct'
import Navbar from '../../../Components/Navbar' 
 
export default function AddSale() {
  return (
    <div>
        <Navbar />
        <div className="container">
            <AddProduct/>
        </div>
    </div>
  )
}
