import axios from "axios";
import { serverUrl } from "../../../Config";

export const addCustomer = (data) => {
    const url = `${serverUrl}/manage-customers`
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}