import React, { useEffect, useState } from 'react';
import axios from 'axios';
 

const ProductsTable = () => {
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
    return <div className="loading">Učitavanje...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products-table-container">
      <h1>Lista proizvoda</h1>
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
          {products.map((product, index) => (
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