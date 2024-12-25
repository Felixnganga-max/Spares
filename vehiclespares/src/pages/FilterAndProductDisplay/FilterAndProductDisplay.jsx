import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import "./FilterAndProductDisplay.css";

const FilterAndProductDisplay = () => {
  const { productData, addToCart, url } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const navigate = useNavigate();

  console.log("Product data is", productData);

  const priceRanges = [
    { label: "100 - 1000", min: 100, max: 1000 },
    { label: "1001 - 5000", min: 1001, max: 5000 },
    { label: "5001 - 10000", min: 5001, max: 10000 },
  ];

  const categories = [
    ...new Set(productData.map((product) => product.category)),
  ];

  console.log(categories);

  const brands = [...new Set(productData.map((product) => product.brand))];

  useEffect(() => {
    let updatedProducts = productData;

    if (selectedCategories.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedBrands.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.label === selectedPriceRange);
      updatedProducts = updatedProducts.filter(
        (product) => product.price >= range.min && product.price <= range.max
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategories, selectedBrands, selectedPriceRange, productData]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange((prevRange) => (prevRange === range ? "" : range));
  };

  return (
    <div className="filter-and-product-container">
      {/* Filters on the left */}
      <div className="filters">
        <h4>Filters</h4>

        {/* Category Filter */}
        <div className="filter-section">
          <h5>Category</h5>
          {categories.map((category) => (
            <label key={category} className="filter-option">
              <span className="category-name">{category}</span>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            </label>
          ))}
        </div>

        {/* Brand Filter */}
        <div className="filter-section">
          <h5>Brand</h5>
          {brands.map((brand) => (
            <label key={brand} className="filter-option">
              <span className="brand-name">{brand}</span>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
            </label>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className="filter-section">
          <h5>Price Range</h5>
          {priceRanges.map((range) => (
            <label key={range.label} className="filter-option">
              <span className="range-name">{range.label}</span>
              <input
                type="checkbox"
                name="price-range"
                checked={selectedPriceRange === range.label}
                onChange={() => handlePriceRangeChange(range.label)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Products on the right */}
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="myproduct-card">
              <Link to={`/product/${product._id}`} className="product-link">
                <img
                  src={url + "/images/" + product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <h5>{product.brand}</h5>
                  <p>{product.stock > 5 ? `In Stock` : "Out of Stock"}</p>
                  <span>KSh {product.price}</span>
                </div>
              </Link>
              <div>
                <button
                  onClick={() => addToCart(product._id)}
                  className="add-to-cart-btn"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={() => {
                    addToCart(product._id); // Add the product to the cart
                    navigate("/order"); // Navigate to the product page
                  }}
                  className="proceed-to-buy"
                >
                  PROCEED TO BUY
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default FilterAndProductDisplay;
