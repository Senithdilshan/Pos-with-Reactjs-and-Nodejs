import axios from "axios"
import { serverUrl } from "../../../Config"

export function addSupplier(data) {
  const url = `${serverUrl}/supplier`

  return axios.post(url, data, {
    headers: {

      'Content-Type': 'application/json'
    }
  });
}
