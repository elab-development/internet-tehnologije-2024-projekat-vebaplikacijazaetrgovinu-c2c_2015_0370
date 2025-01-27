import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('name');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', stock: '', status: 'active', image_url: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [categories, setCategories] = useState(['Elektronika', 'Odeća', 'Hrana', 'Igračke', 'Nameštaj']);
  const [newCategory, setNewCategory] = useState('');
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem("auth_token");
    let navigate =  useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/my-products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju proizvoda.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

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

  const handleAddOrUpdateProduct = async () => {
    try {
      if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
        newProduct.category = newCategory;
      }

      if (editProductId) {
        // Update existing product
        const response = await axios.put(`http://127.0.0.1:8000/api/products/${editProductId}`, newProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updatedProducts = products.map((product) =>
          product.id === editProductId ? response.data.product : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        setEditProductId(null);
      } else {
        // Add new product
        const response = await axios.post('http://127.0.0.1:8000/api/products', newProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts([...products, response.data.product]);
        setFilteredProducts([...products, response.data.product]);
      }
      setNewProduct({ name: '', description: '', price: '', category: '', stock: '', status: 'active', image_url: '' });
      setNewCategory('');
    } catch (err) {
      alert('Greška pri dodavanju ili ažuriranju proizvoda.');
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditProductId(product.id);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (err) {
      alert('Greška pri brisanju proizvoda.');
    }
  };
    const viewOrders = (productId) => {
        navigate(`/product-orders/${productId}`);
    };
  if (loading) {
    return <div className="loading">Učitavanje...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products-table-container">
      <h1>Lista mojih proizvoda</h1>
      <div className="search-container">
        <select onChange={handleFilterChange} value={filterCriteria} className="filter-select">
          <option value="name">Naziv</option>
          <option value="description">Opis</option>
          <option value="price">Cena</option>
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
      <div className="add-product-container">
        <h2>{editProductId ? 'Izmeni proizvod' : 'Dodaj novi proizvod'}</h2>
        <input
          type="text"
          placeholder="Naziv"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Opis"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cena"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Izaberite kategoriju</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Dodaj novu kategoriju"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stanje"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link slike"
          value={newProduct.image_url}
          onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
        />
        <select
          value={newProduct.status}
          onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
        >
          <option value="active">Aktivan</option>
          <option value="inactive">Neaktivan</option>
        </select>
        <button onClick={handleAddOrUpdateProduct}>{editProductId ? 'Izmeni proizvod' : 'Dodaj proizvod'}</button>
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
            <th>Slika</th>
            <th>Status</th>
            <th>Akcije</th>
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
              <td><img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{product.status === 'active' ? 'Aktivan' : 'Neaktivan'}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Izmeni</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Obriši</button> 
                <button onClick={() => viewOrders(product.id)}>Pregledaj porudžbine</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
