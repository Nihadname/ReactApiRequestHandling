import React from "react";
import PropTypes from "prop-types";
import ProductCard from "../ProductCard/Inde";
import "./Index.css"
function ProductsList({ products }) {
  return (
    <React.Fragment>
      <h1  style={{
        textAlign:"center"
      }}>Products</h1>
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </React.Fragment>
  );
}

// Define what types of props this component expects
ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductsList;
