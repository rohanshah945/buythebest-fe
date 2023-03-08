import React from "react";
import "./Order.css";

function Order({ order }) {
  const total = order.items.reduce((acc, item) => acc + +item.price, 0);
  return (
    <div className="order">
      <div className="order__id">
        Order ID: <span className="font-black">{order.id}</span>
      </div>
      <div className="order__items">
        {order.items.map((i, index) => (
          <div key={index} className="order__item">
            <img src={i.image} className="order__itemImage" />
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-base">{i.title}</span>
              <span className="font-medium text-sm">$ {i.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="order__footer">
        <div className="order__footerPayment">
          Payment Mode: {order.payment_mode}
        </div>
        <div className="order__footerTotal">Total: $ {total.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Order;
