import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju proizvoda.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter((product) =>
      product[filterCriteria]?.toString().toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
    setSearchTerm('');
    setFilteredProducts(products);
  };

  if (loading) {
    return <div className="loading">Učitavanje...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products-table-container">
      <h1>Lista proizvoda</h1>
      <div className="search-container">
        <select onChange={handleFilterChange} value={filterCriteria} className="filter-select">
          <option value="name">Naziv</option>
          <option value="description">Opis</option> 
          <option value="category">Kategorija</option>
          <option value="status">Status</option>
        </select>
        <input
          type="text"
          placeholder={`Pretraži po ${filterCriteria}`}
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Cena</th>
            <th>Kategorija</th>
            <th>Stanje</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price} RSD</td>
              <td>{product.category || 'N/A'}</td>
              <td>{product.stock || 'N/A'}</td>
              <td>{product.status === 'active' ? 'Aktivan' : 'Neaktivan'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
