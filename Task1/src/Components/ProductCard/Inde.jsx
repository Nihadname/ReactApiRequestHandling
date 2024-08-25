import PropTypes from 'prop-types';
import './index.css'; 

const ProductCard = ({ product }) => {
  return (
    <>
    <div className="product-card">
      <img src={product.productImageName} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-category">{product.category.name}</p>
        <p className="product-price">${product.salePrice.toFixed(2)}</p>
        <p className="product-profit">Profit: ${product.profitMadeFromOne.toFixed(2)}</p>
        <button className="product-button">View Details</button>
      </div>
    </div>
    </>
    
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    productImageName: PropTypes.string.isRequired,
    salePrice: PropTypes.number.isRequired,
    costPrice: PropTypes.number.isRequired,
    profitMadeFromOne: PropTypes.number.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      productCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;
