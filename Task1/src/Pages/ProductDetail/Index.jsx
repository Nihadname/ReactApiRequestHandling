import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Index.css'; 

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5104/api/Product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-category">
          <strong>Category:</strong> {product.category?.name} (Total Products: {product.category?.productsCount})
        </p>
        <div className="product-price-info">
          <p>
            <strong>Sale Price:</strong> ${product.salePrice.toFixed(2)}
          </p>
          <p>
            <strong>Cost Price:</strong> ${product.costPrice.toFixed(2)}
          </p>
          <p>
            <strong>Profit per Unit:</strong> ${product.profitMadeFromOne.toFixed(2)}
          </p>
        </div>
        <div className="product-timestamps">
          <p>
            <strong>Created On:</strong> {new Date(product.createdTime).toLocaleDateString()}
          </p>
          <p>
            <strong>Last Updated:</strong> {new Date(product.updatedTime).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
