import axios from "axios";
import { serverUrl } from "../../../Config";

export const updateCustomer = () => {
    const id = document.querySelector('input[name="ucustomer_id"]').value;
    const name = document.querySelector('input[name="uname"]').value;
    const mobie = document.querySelector('input[name="umobile"]').value;
    const loyalty_points = document.querySelector('input[name="uloyalty_points"]').value;
    const email = document.querySelector('input[name="uemail"]').value;

    const url = `${serverUrl}/manage-customers/updateCustomer/`+id;
    console.log( 'gddfgdgdg >> ' + url);
    const data = {
        customer_id: id,
        name: name,
        mobile: mobie,
        loyalty_points: loyalty_points,
        email: email,
    }
    
    return axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}