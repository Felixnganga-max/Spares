import React, { useState, useEffect, useContext } from "react";
import "./Hero.css";
import { ShopContext } from "../../context/ShopContext";

const Hero = () => {
  const { productData, url } = useContext(ShopContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Slide-changing interval logic
  useEffect(() => {
    if (productData.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % productData.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [productData.length]);

  // Prevent errors if productData is empty
  if (productData.length === 0) {
    return <div>Loading...</div>;
  }

  // Get the current product based on the currentSlideIndex
  const randomProduct = productData[currentSlideIndex];

  // Destructure with fallback to prevent errors
  const { 
    image = '', 
    name = 'Product', 
    description = 'No description available', 
    price = 0 
  } = randomProduct || {};

  // Construct image URL safely
  const productImage = image ? `${url}/images/${image}` : '';

  return (
    <div
      className="hero-container"
      style={{
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Left Section */}
      <div className="hero-left animate" key={currentSlideIndex}>
        <h1>{name}</h1>
        <h2>Get it at KSh {price} /- only</h2>
        <p>{description}</p>
        <button className="discover-btn">Discover Now</button>
      </div>

      {/* Center image */}
      <div className="center-image">
        {productImage && (
          <img 
            src={productImage} 
            alt={name} 
            height={300} 
            width={300} 
          />
        )}
      </div>

      {/* Right Section */}
      <div className="hero-right">
        <div className="form-header">
          <i className="fa fa-car"></i>
          <span>Add Your Vehicle</span>
        </div>
        <div className="vehicle-form">
          <select>
            <option>Choose Year</option>
          </select>
          <select>
            <option>Select Make</option>
          </select>
          <select className="make" disabled>
            <option>Select Make first</option>
          </select>
          <select>
            <option>Select Part</option>
          </select>
          <button className="search-btn">SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;