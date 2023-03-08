import React from "react";
import Category from "../Category/Category";

import "./HomeSection.css";

function HomeSection() {
  return (
    <div className="homeSection">
      <div className="homeSection__title">Shop for Home and Business</div>
      <div className="homeSection__items">
        <Category
          title="Laptop"
          to="/products/laptop"
          image="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
        />
        <Category
          title="Desktop"
          to="/products/desktop"
          image="https://images.unsplash.com/photo-1636485043041-e1d05b9f0662?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        />
        <Category
          title="Monitor"
          to="/products/monitor"
          image="https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        />
        <Category
          title="Electronic Accessories"
          to="/products/electronic_accessories"
          image="https://images.pexels.com/photos/7989742/pexels-photo-7989742.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        />
      </div>
    </div>
  );
}

export default HomeSection;
