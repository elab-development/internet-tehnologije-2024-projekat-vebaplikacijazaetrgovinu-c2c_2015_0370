import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './komponente/LandingPage';
import RegisterPage from './komponente/RegisterPage';
import LoginPage from './komponente/LoginPage';
import Navbar from './komponente/Navbar';
import ProductsPage from './komponente/ProductsPage';
import ProductDetailsPage from './komponente/ProductDetailsPage';
import ProductsTable from './komponente/ProductsTable';
import OrderConfirmationPage from './komponente/OrderConfirmationPage';
import ProductOrdersPage from './komponente/ProductOrdersPage';
import AdminDashboard from './komponente/AdminDashboard';
import AdminProducts from './komponente/AdminProducts';

function App() {
  const [authData, setAuthData] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (token && user) {
      setAuthData({ token, user: JSON.parse(user) });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar authData={authData} setAuthData={setAuthData} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage setAuthData={setAuthData} />} />
          <Route path="/login" element={<LoginPage setAuthData={setAuthData} />} />
          <Route path="/home" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />




          <Route path="/orders/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/myProducts" element={<ProductsTable />} />
          <Route path="/product-orders/:productId" element={<ProductOrdersPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
