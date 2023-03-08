import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

function Category({ image, title, to }) {
  return (
    <Link className="category" to={to}>
      <img className="category__image" src={image} alt={title} />
      <span className="category__title">{title}</span>
    </Link>
  );
}

export default Category;
