import axios from "axios";
import { baseURL } from "./login";

export function placeOrder(payload) {
  try {
    return axios
      .post(`${baseURL}/placeOrder`, payload)
      .then((response) => response)
      .catch((err) => {
        if (err) {
          throw new Error(err?.response?.data?.errors[0].message || err);
        }
      });
  } catch (err) {
    return err;
  }
}

export function getAllOrders(user_id) {
  try {
    return axios
      .get(`${baseURL}/ordersByUser/${user_id}`)
      .then((response) => response)
      .catch((err) => {
        if (err) {
          throw new Error(err?.response?.data?.errors[0].message || err);
        }
      });
  } catch (err) {
    return err;
  }
}
