import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState('RSD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/RSD');
        setExchangeRates(response.data.rates);
      } catch (err) {
        console.error('Greška pri učitavanju kurseva valuta.');
      }
    };

    fetchProducts();
    fetchExchangeRates();
  }, []);

  const convertPrice = (price) => {
    if (currency === 'RSD') return price;
    const rate = exchangeRates[currency];
    return rate ? (price * rate).toFixed(2) : price;
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div>Učitavanje proizvoda...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-page">
      <h1>Ponuda</h1>
      <div className="controls">
        <div className="currency-selector">
          <label htmlFor="currency">Prikaz cena u: </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.keys(exchangeRates).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
        <div className="search-bar">
          <label htmlFor="search">Pretraga: </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Pretraži proizvode po nazivu..."
          />
        </div>
      </div>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={`${convertPrice(product.price)} ${currency}`}
            imageUrl={product.image_url}
            category={product.category}
            onDetailsClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
        {filteredProducts.length === 0 && (
          <p className="no-results">Nema proizvoda za prikaz.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
