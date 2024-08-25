import { useState, useEffect } from 'react';
import axios from 'axios';

import ProductsList from "../../Components/ProductList/Index";
import Pagination from "../../Components/Pagination/Index";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Typically, pages start from 1
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage] = useState(2); // Same as `Take` in backend

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5104/api/Product?page=${currentPage}`);
      console.log('API Response:', response.data);
      setProducts(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <ProductsList products={products} />
      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}

export default Products;
