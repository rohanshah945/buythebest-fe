import React from "react";
import { useNavigate } from "react-router-dom";
import { REMOVE_ALL_FROM_CART } from "../../Config/constants";
import "./Summary.css";

function Summary({ items, userDispatch }) {
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, i) => acc + +i.price, 0).toFixed(2);
  const shipping = 10;
  const taxes = (subtotal * 0.1).toFixed(2);
  const total = (+subtotal + +shipping + +taxes).toFixed(2);

  const deleteAll = () => {
    userDispatch({
      type: REMOVE_ALL_FROM_CART,
    });
  };

  const gotToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="summary">
      <div className="summary__title">Summary</div>
      <hr className="summary__divider" />
      <div className="summary__field">{`Subtotal: $ ${subtotal}`}</div>
      <div className="summary__field">{`Shipping: $ ${shipping}`}</div>
      <div className="summary__field">{`Taxes: $ ${taxes}`}</div>
      <hr className="summary__divider" />
      <div className="summary__field">{`Total: $ ${total}`}</div>
      <div className="summary__actions">
        <button
          onClick={() => gotToCheckout()}
          className="summary__actionsConfirm"
        >
          Confirm
        </button>
        <button onClick={() => deleteAll()} className="summary__actionsDelete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Summary;
