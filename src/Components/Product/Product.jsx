import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ADD_TO_CART } from "../../Config/constants";
import { UserContext } from "../../Store/UserContext";
import "./Product.css";

function Product({ id, category, title, image, price }) {
  const { userDispatch } = useContext(UserContext);

  const addToCart = () => {
    const item = { id, category, title, image, price };
    userDispatch({
      type: ADD_TO_CART,
      item,
    });
    toast.success("Item added to Cart.");
  };

  return (
    <div className="product">
      <Link to={`/products/${category}/${id}`}>
        <img className="product__image" src={image} alt={title} />
        <span className="product__title" title={title}>
          {title}
        </span>
      </Link>
      <div className="product__actions">
        <span>{`$ ${price}`}</span>
        <button onClick={() => addToCart()} className="product__actionsButton">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
