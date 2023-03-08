import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ADD_TO_CART } from "../../Config/constants";
import { UserContext } from "../../Store/UserContext";
import ProductList from "../../utils/products";
import "./ProductDescription.css";

function ProductDescription() {
  const { category, productId } = useParams();
  const { userDispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const item = ProductList?.[category]?.[productId];

  if (!item) return <div className="productDescription">No result found</div>;

  const goBack = () => {
    navigate(-1);
  };

  const addToCart = () => {
    const { id, image, price, title } = item;
    userDispatch({
      type: ADD_TO_CART,
      item: {
        id,
        image,
        price,
        title,
        category,
      },
    });
    toast.success("Item added to Cart.");
  };

  return (
    <div className="productDescription">
      <div className="productDescription__left">
        <button
          onClick={() => goBack()}
          className="bg-blue-500 hover:bg-blue-700 py-2.5 px-4 absolute top-20 left-3 text-white rounded-full text-2xl font-serif font-black"
          title="Go back to list"
        >{`←`}</button>

        <img
          alt={item.title}
          src={item.image}
          className="productDescription_image"
        />

        <div className="productDescription__leftActions">
          <button
            onClick={() => addToCart()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="productDescription__right">
        <div className="productDescription__rightTitle">{item.title}</div>
        <div className="productDescription__rightDescription">
          {item.description}
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
