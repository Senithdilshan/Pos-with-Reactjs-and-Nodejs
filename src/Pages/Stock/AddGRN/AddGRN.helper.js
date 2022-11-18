import axios from "axios"
import { serverUrl } from "../../../Config"

export function addgrn(data) {
  const url = `${serverUrl}/grn`

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