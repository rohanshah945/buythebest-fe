import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrder } from "../../APIs/order";
import { REMOVE_ALL_FROM_CART } from "../../Config/constants";
import { UserContext } from "../../Store/UserContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const {
    user: { user, cart },
    userDispatch,
  } = useContext(UserContext);

  const [tab, setTab] = useState("checkout");

  const [formValues, setFormValues] = useState({
    address: user.address || "",
    postal_code: user.postal_code || "",
    payment_mode: "card",
  });

  useEffect(() => {
    if (!cart) return navigate("/");
  }, [cart]);

  const handleFormValue = (e) => {
    setFormValues((formValues) => ({
      ...formValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = () => {
    const payload = {
      user_id: user.id,
      items: cart,
      address: formValues.address,
      postal_code: formValues.postal_code,
      payment_mode: formValues.payment_mode,
    };
    placeOrder(payload)
      .then((res) => {
        toast.success(res.data.message);
        userDispatch({
          type: REMOVE_ALL_FROM_CART,
        });
        return navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleProceed = () => {
    if (formValues.payment_mode === "card") {
      setTab("payment");
    } else {
      return handlePlaceOrder();
    }
  };

  const handlePay = () => {
    return handlePlaceOrder();
  };

  const subtotal = cart.reduce((acc, i) => acc + +i.price, 0).toFixed(2);
  const shipping = 10;
  const totalBeforeTax = Number(+subtotal + +shipping).toFixed(2);
  const taxes = (subtotal * 0.1).toFixed(2);
  const total = (+subtotal + +shipping + +taxes).toFixed(2);

  return tab === "checkout" ? (
    <div className="checkout">
      <span className="checkout_title">Checkout</span>
      <hr className="checkout_divider" />
      <div className="checkout__body">
        <div className="checkout__bodySection">
          <div className="checkout__bodySectionTitle">Shipping Address</div>

          <div className="checkout__formField">
            <span className="checkout__formLabel">Address</span>
            <textarea
              name="address"
              value={formValues.address}
              onChange={handleFormValue}
              className="checkout__formInput h-32"
            ></textarea>
          </div>

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`Postal Code`}</span>{" "}
            <input
              name="postal_code"
              value={formValues.postal_code}
              onChange={handleFormValue}
              className="checkout__formInput"
            />
          </div>

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`Mode of Payment`}</span>{" "}
            <select
              name="payment_mode"
              value={formValues.payment_mode}
              onChange={handleFormValue}
              className="checkout__formInput"
            >
              <option value="card">Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>
        <div className="checkout__bodySection">
          <div className="checkout__bodySectionTitle">Checkout Details</div>
          <hr className="checkout_divider" />

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`Number of Items`}</span>{" "}
            <input
              value={cart.length}
              disabled
              className="checkout__formInput"
            />
          </div>

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`Shipping & Handling`}</span>{" "}
            <input value={shipping} disabled className="checkout__formInput" />
          </div>

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`Total Before Tax`}</span>{" "}
            <input
              value={totalBeforeTax}
              disabled
              className="checkout__formInput"
            />
          </div>

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`Estimated Tax`}</span>{" "}
            <input value={taxes} disabled className="checkout__formInput" />
          </div>

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`ORDER TOTAL`}</span>{" "}
            <input value={total} disabled className="checkout__formInput" />
          </div>

          <div className="checkout__formField">
            <button
              onClick={() => handleProceed()}
              disabled={
                !formValues.address.length ||
                !formValues.postal_code.length ||
                !formValues.payment_mode.length
              }
              className="checkout__formSubmit bg-blue-500"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="checkout">
      <span className="checkout_title">Payment Details</span>
      <hr className="checkout_divider" />
      <div className="checkout__body">
        <div className="checkout__bodySection">
          <div className="checkout__bodySectionTitle">Checkout Details</div>
          <hr className="checkout_divider" />

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`Name on the card`}</span>{" "}
            <input className="checkout__formInput" />
          </div>

          <div className="checkout__formField">
            <span className="checkout__formLabel">{`Card Number`}</span>{" "}
            <input className="checkout__formInput" />
          </div>

          <div className="flex space-x-5">
            <div className="checkout__formField w-1/2">
              <span className="checkout__formLabel">{`Expiry Date`}</span>{" "}
              <div className="flex justify-center items-center space-x-5">
                <input
                  placeholder="Start Date"
                  className="checkout__formInput w-1/2"
                />
                <span className="font-bold"> / </span>
                <input
                  placeholder="End Date"
                  className="checkout__formInput w-1/2"
                />
              </div>
            </div>

            <div className="checkout__formField w-1/2">
              <span className="checkout__formLabel">{`Security Code`}</span>{" "}
              <input className="checkout__formInput" />
            </div>
          </div>

          <div className="checkout__formField flex items-center justify-center">
            <button
              onClick={() => handlePay()}
              className="
              text-white font-bold px-5 py-2 mt-5 rounded focus:outline-none shadow transition-colors  bg-green-500 hover:bg-green-700"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
