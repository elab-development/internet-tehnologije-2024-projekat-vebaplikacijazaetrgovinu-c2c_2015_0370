 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju proizvoda.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Učitavanje proizvoda...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-page">
      <h1>Ponuda</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.image_url}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
