import axios from "axios";
import { baseURL } from "./login";

export function updateUser(user) {
  try {
    return axios
      .post(`${baseURL}/users/${user.id}`, user)
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
