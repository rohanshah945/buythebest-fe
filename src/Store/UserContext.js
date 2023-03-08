import React, { createContext, useEffect, useReducer } from "react";
import { ADD_USER } from "../Config/constants";
import { userReducer } from "./UserReducer";

export const UserContext = createContext();

const initialState = {
  user: {},
  cart: [],
  loading: false,
};

const UserProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      userDispatch({
        type: ADD_USER,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
