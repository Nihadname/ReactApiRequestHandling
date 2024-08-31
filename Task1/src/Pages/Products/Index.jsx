import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsList from "../../Components/ProductList/Index";
import Pagination from "../../Components/Pagination/Index";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [search, setSearch] = useState(''); 

  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [Take, setTake] = useState(4); 
  const[minPrice,SetMinPrice]=useState('');
  const[maxPrice,SetMaxPrice]=useState('');

  const itemsPerPage = Take;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, search, Take,minPrice,maxPrice]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5104/api/Category/getAll');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5104/api/Product?page=${currentPage}&CategoryId=${selectedCategory}&search=${search}&Take=${Take}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value ? parseInt(e.target.value) : '');
    setCurrentPage(1); 
  };
const handleTakeChange=(value)=>{
  setTake(value);
  setCurrentPage(1); 

}
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <input type="number"         onChange={e=>SetMinPrice(e.target.value)}/>
      <input type="number"  onChange={e=>SetMaxPrice(e.target.value)}/>

<p></p>
      {/* Search input */}
      <div className="items-per-page">
        <button onClick={() => handleTakeChange(3)}>3</button>
        <button onClick={() => handleTakeChange(5)}>5</button>
        <button onClick={() => handleTakeChange(7)}>7</button>
      </div>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category filter dropdown */}
      <div className="filter-container">
        <select onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

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
