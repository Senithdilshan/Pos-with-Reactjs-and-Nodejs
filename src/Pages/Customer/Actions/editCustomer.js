export const editCustomer = (id, name, mobile, loyalty, email) => {
    document.querySelector('input[name="ucustomer_id"]').value = id;
    document.querySelector('input[name="uname"]').value = name;
    document.querySelector('input[name="umobile"]').value = mobile;
    document.querySelector('input[name="uloyalty_points"]').value = loyalty;
    document.querySelector('input[name="uemail"]').value = email;
    
    document.getElementById('cust-show').classList.add('d-none');
    document.getElementById('cust-edit').classList.remove('d-none');
}
