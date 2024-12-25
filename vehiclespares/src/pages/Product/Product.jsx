import React, { useContext, useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Product.css";
import { ShopContext } from "../../context/ShopContext";

const Product = () => {
  const { productData, addToCart, url } = useContext(ShopContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundProduct = productData.find(
      (prod) => prod._id === productId || prod._id.toString() === productId
    );

    setProduct(foundProduct || null);
    setLoading(false);
  }, [productId, productData]);

  const relatedProducts = useMemo(() => {
    if (product) {
      return productData
        .filter(
          (prod) =>
            prod.category === product.category && prod._id !== product._id
        )
        .slice(0, 4);
    }
    return [];
  }, [product, productData]);

  if (loading) {
    return <div className="loading-container">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
        <button
          onClick={() => navigate("/collections")}
          className="back-to-home-btn"
        >
          Back to Collections
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <ProductInfo product={product} url={url} />
      <RelatedProducts
        relatedProducts={relatedProducts}
        url={url}
        currentProductId={product._id}
      />
    </div>
  );
};

const ProductInfo = ({ product, url }) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleBuyNow = () => {
    addToCart(product._id);
    // Ensure navigation happens after cart addition
    setTimeout(() => {
      navigate("/order");
    }, 100);
  };

  return (
    <div className="product-info-container">
      <div className="product-images-container">
        {product.image ? (
          <img
            src={`${url}/images/${product.image}`}
            alt={product.name || "Unnamed Product"}
            className="product-main-image"
            onError={(e) => {
              e.target.src = "/placeholder-image.png";
            }}
          />
        ) : (
          <div className="no-image-placeholder">No Image Available</div>
        )}
      </div>

      <div className="product-details-content">
        <h1 className="product-title">{product.name || "Unnamed Product"}</h1>
        <p className="product-description">
          {product.description || "No description available"}
        </p>
        <p className="product-price">
          KSh {product.price ? product.price.toLocaleString() : "0"}
        </p>

        <div className="product-stock-info">
          {product.stock > 0 ? (
            <span className="in-stock">In Stock: {product.stock} available</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>

        <div className="add-buy">
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="buy-button"
            disabled={product.stock === 0}
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

const RelatedProducts = React.memo(({ relatedProducts, url, currentProductId }) => {
  const navigate = useNavigate();

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="related-products-section">
      <h2 className="related-products-title">Related Products</h2>
      <div className="related-products-grid">
        {relatedProducts.map((prod) => (
          <div
            key={prod._id}
            className="related-product-card"
            onClick={() => navigate(`/product/${prod._id}`)}
          >
            <img
              src={`${url}/images/${prod.image}`}
              alt={prod.name || "Unnamed Product"}
              className="related-product-image"
              onError={(e) => {
                e.target.src = "/placeholder-image.png";
              }}
            />
            <div className="related-product-info">
              <h3 className="related-product-title">{prod.name || "Unnamed"}</h3>
              <p className="related-product-price">
                KSh {prod.price ? prod.price.toLocaleString() : "0"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Product;