import React, { useContext } from "react";
import Summary from "../../Components/Summary/Summary";
import { REMOVE_FROM_CART } from "../../Config/constants";
import { UserContext } from "../../Store/UserContext";

import "./Cart.css";

function Cart() {
  const {
    user: { cart },
    userDispatch,
  } = useContext(UserContext);

  if (!cart?.length) {
    return (
      <div className="flex flex-1 justify-center text-3xl font-semibold text-gray-700">
        <span>The cart is empty.</span>
      </div>
    );
  }

  const deleteItem = (id) => {
    userDispatch({
      type: REMOVE_FROM_CART,
      id,
    });
  };

  return (
    <div className="cart">
      <span className="cart_title">Cart</span>
      <hr className="cart_divider" />
      <div className="cart__body">
        <div className="cart__bodyLeft">
          {cart.map((item, i) => (
            <div key={`${item.id}_${i}`} className="cart__item">
              <img
                alt={`${item.id}_${i}`}
                src={item.image}
                className="cart__image"
              />
              <div className="cart__action">
                <div className="cart__actionTitle">{item.title}</div>
                <div className="cart__actionPrice">{`$ ${item.price}`}</div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="cart__actionDelete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__bodyRight">
          <Summary items={cart} userDispatch={userDispatch} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
