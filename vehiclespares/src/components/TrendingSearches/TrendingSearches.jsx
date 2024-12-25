import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import "./TrendingSearches.css";
import { Link } from "react-router-dom";

const categories = ["Brakes", "Lights", "Interior Accessories", "Engine"];

const TrendingSearches = () => {
  const {productData, addToCart, url} = useContext(ShopContext)
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredProducts = productData
    .filter((product) => product.category === selectedCategory)
    .slice(0, 5);  

  return (
    <div className="trending-searches">
      <h2 className="trending-title">TRENDING SEARCHES</h2>
      <div className="trending-categories">
        {categories.map((category, index) => (
          <span
            key={index}
            className={`trending-category ${
              selectedCategory === category ? "trending-category-active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="trending-product-grid">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}  // Changed to _id to match MongoDB's default ID
            className="trending-product-card"
            key={product._id}
            onClick={(e) => {
              // Prevent the link from interfering with the Add to Cart button
              e.stopPropagation();
            }}
          >
            <img
              src={`${url}/images/${product.image}`}
              alt={product.name}
              className="trending-product-image"
            />
            <div className="trending-product-info">
              <h4 className="trending-product-name">{product.name}</h4>
              <div className="trending-product-price">
                KSh {product.price.toFixed(2)}
              </div>
              <div
                className={`trending-stock-status ${
                  product.stock > 0 ? "" : "trending-stock-out-of-stock"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault(); // Prevent link navigation
                e.stopPropagation(); // Stop event propagation
                addToCart(product._id);
              }} 
              className="trending-add-to-cart"
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearches;