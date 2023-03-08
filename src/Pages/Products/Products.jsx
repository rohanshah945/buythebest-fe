import React from "react";
import { useParams } from "react-router-dom";
import Product from "../../Components/Product/Product";
import ProductList from "../../utils/products";

import "./Products.css";

function Products() {
  const { category } = useParams();
  const items = ProductList[category];

  if (!items) {
    return (
      <div className="flex flex-1 justify-center text-3xl font-semibold text-gray-700">
        <span>No results found for {category}.</span>
      </div>
    );
  }

  return (
    <div className="products">
      <div className="products__title">{category.replace("_", " ")}</div>
      <div className="products__items">
        {Object.values(items).map((item) => (
          <Product {...item} category={category} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
