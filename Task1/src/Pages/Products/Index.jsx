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
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  function toggle() {
    setIsOpen(true);
  }
  const itemsPerPage = Take;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, search, Take,minPrice,maxPrice]);

  const fetchCategories = async () => {
    try {
        const token = localStorage.getItem('jwtToken');

      const response = await axios.get('http://localhost:5104/api/Category/getAll',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      const response = await axios.get(
        `http://localhost:5104/api/Product?page=${currentPage}&CategoryId=${selectedCategory}&search=${search}&Take=${Take}&minPrice=${minPrice}&maxPrice=${maxPrice}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
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
    const value=e.target.value ? parseInt(e.target.value) : ''
    setSelectedCategory(value);
    setCurrentPage(1); 
    updateFilters('Category', value ? categories.find(c => c.id === value)?.name : 'All Categories');

  };
const handleTakeChange=(value)=>{
  setTake(value);
  setCurrentPage(1); 
  updateFilters('Items per page', value);

}
const handleMinPriceChange = (value) => {
  SetMinPrice(value);
  updateFilters('Min Price', value);
};
const handleMaxPriceChange = (value) => {
  SetMaxPrice(value);
  updateFilters('Max Price', value);
};
const updateFilters = (key, value) => {
  setFilters((prevFilters) => {
    const updatedFilters = prevFilters.filter((filter) => filter.key !== key);
    if (value) updatedFilters.push({ key, value });
    return updatedFilters;
  });
};

const removeFilter = (key) => {
  setFilters((prevFilters) => prevFilters.filter((filter) => filter.key !== key));
  if (key === 'Category') setSelectedCategory('');
  if (key === 'Min Price') SetMinPrice('');
  if (key === 'Max Price') SetMaxPrice('');
  if (key === 'Items per page') setTake(4); 
};
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <input type="number"         onChange={e=>handleMinPriceChange(e.target.value)}/>
      <input type="number"  onChange={e=>handleMaxPriceChange(e.target.value)}/>

<p></p>
   {/* Display applied filters */}
   <div  value={isOpen} className="applied-filters">
        {filters.map((filter) => (
          <span key={filter.key} onClick={() => removeFilter(filter.key)} className="filter-tag">
            {filter.key}: {filter.value} ✕
          </span>
        ))}
      </div>
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
        <select onChange={handleCategoryChange} onClick={toggle}>
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
