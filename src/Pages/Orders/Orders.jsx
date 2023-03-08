import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllOrders } from "../../APIs/order";
import Order from "../../Components/Order/Order";
import { UserContext } from "../../Store/UserContext";
import "./Orders.css";

function Orders() {
  const {
    user: { user },
  } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders(user.id)
      .then((res) => {
        if (res) {
          setOrders(res.data.orders);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <div className="orders">
      <span className="orders_title">Orders</span>
      <hr className="orders_divider" />
      <div className="orders__body">
        {orders.map((i) => (
          <Order order={i} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
