import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductOrdersPage = () => {
  const { productId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju porudžbina.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [productId, token]);

  const updateOrderStatus = async (orderId) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/orders/${orderId}/status`,
        { status: 'completed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);

      // Ažuriranje lokalnog stanja
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: 'completed' } : order
        )
      );
    } catch (err) {
      alert('Greška pri ažuriranju statusa narudžbine.');
    }
  };

  if (loading) {
    return <div className="loading">Učitavanje porudžbina...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-orders-page">
      <h1>Porudžbine za proizvod ID: {productId}</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID Porudžbine</th>
            <th>Korisnik</th>
            <th>Email</th>
            <th>Adresa</th>
            <th>Datum</th>
            <th>Status</th>
            <th>Ukupna cena</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.id}</td>
              <td>{order.user?.name || 'Nepoznato'}</td>
              <td>{order.user?.email || 'Nepoznato'}</td>
              <td>{order.user?.address || 'Nepoznato'}</td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              <td>{order.status}</td> 
              <td>{order.total_price} RSD</td>
              <td>
                {order.status === 'pending' && (
                  <button
                    className="primary-button"
                    onClick={() => updateOrderStatus(order.id)}
                  >
                    Označi kao završeno
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductOrdersPage;
