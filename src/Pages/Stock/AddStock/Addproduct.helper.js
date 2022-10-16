import axios from "axios"
import { serverUrl } from "../../../Config"

export function addProduct(data) {
  const url = `${serverUrl}/product`

  return axios.post(url, data, {
    headers: {

      'Content-Type': 'application/json'
    }
  });
}

// export function getproducts(data) {
//   const url = `${serverUrl}/product`
//   return axios.get(url, data,);
// }