//import React from 'react'

export const editCustomer = (id, name, mobile, loyalty, email) => {
    document.querySelector('input[name="customer_id"]').value = id;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="mobile"]').value = mobile;
    document.querySelector('input[name="loyalty_points"]').value = loyalty;
    document.querySelector('input[name="email"]').value = email;
    
    console.log('sdsdssd >> ' + document.querySelector('input[name="customer_id"]').value );
    
  /*return (
    <div>editCustomer</div>
  )*/
}
