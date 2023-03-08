import axios from "axios";

export const baseURL = "http://localhost:9000";

export function login(email, password) {
  try {
    return axios
      .post(`${baseURL}/auth`, {
        email,
        password,
      })
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

export function register(user) {
  try {
    return axios
      .post(`${baseURL}/register`, user)
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
