import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import './AdminProductList.css'

const AdminProductList = () => {
  const { productData, url } = useContext(ShopContext); // Access product data
  const [selectedCategory, setSelectedCategory] = useState(""); // For category filtering

  // Get unique categories from the product data
  const categories = [...new Set(productData.map((product) => product.category))];

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? productData.filter((product) => product.category === selectedCategory)
    : productData;

  const handleDelete = (id) => {
    console.log("Delete product with id:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit product with id:", id);
  };

  const handleView = (id) => {
    console.log("View product with id:", id);
  };

  return (
    <div className="admin-product-list">
      <h2>Product Inventory</h2>

      {/* Filter Section */}
      <div className="filter-section">
        <label>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="product-list-container">
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div>
                <img
                  src={`${url}/images/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div>{product.name}</div>
              <div>${product.price}</div>
              <div>{product.stock}</div>
              <div className="product-actions">
                <FaEye onClick={() => handleView(product._id)} title="View" />
                <FaEdit onClick={() => handleEdit(product._id)} title="Edit" />
                <FaTrash onClick={() => handleDelete(product._id)} title="Delete" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
