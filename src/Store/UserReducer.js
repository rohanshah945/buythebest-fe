import {
  ADD_USER,
  REMOVE_USER,
  LOADING_OFF,
  LOADING_ON,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
} from "../Config/constants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };
    case REMOVE_USER:
      localStorage.removeItem("user");
      return { ...state, loading: false, user: {} };
    case LOADING_ON:
      return { ...state, loading: true };
    case LOADING_OFF:
      return { ...state, loading: false };
    case ADD_TO_CART: {
      return { ...state, cart: [...state.cart, action.item] };
    }
    case REMOVE_FROM_CART: {
      const itemIndex = state.cart.findIndex((i) => i.id === action.id);
      return {
        ...state,
        cart: state.cart.filter((i, index) => index !== itemIndex),
      };
    }
    case REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return state;
  }
};
