import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
 
import 'jspdf-autotable';


const OrderConfirmationPage = () => {
  const { orderId } = useParams(); // Preuzimamo ID porudžbine iz URL-a
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju detalja porudžbine.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, token]);

  const generatePDFInvoice = () => {
    if (!orderDetails) return;
  
    const doc = new jsPDF();
  
    // Dodavanje naslova
    doc.setFontSize(20);
    doc.text('POTVRDA', 105, 20, null, null, 'center');
  
    // Informacije o narudžbini
    doc.setFontSize(12);
    doc.text(`ID narudžbine: ${orderDetails.id}`, 20, 40);
    doc.text(`Datum narudžbine: ${new Date(orderDetails.order_date).toLocaleString()}`, 20, 50);
    doc.text(`Ukupna cena: ${orderDetails.total_price} RSD`, 20, 60);
    doc.text(`Status: ${orderDetails.status}`, 20, 70);
  
    // Tabela sa detaljima proizvoda
    const startY = 90;
    doc.text('Detalji proizvoda:', 20, startY);
    doc.autoTable({
      startY: startY + 10,
      head: [['Naziv proizvoda', 'Cena', 'Kolicina']],
      body: [
        [
          orderDetails.product.name,
          `${orderDetails.product.price} RSD`,
          '1', // Količina (pretpostavka)
        ],
      ],
      theme: 'grid',
    });
  
    // Dodavanje podnožja
    const footerY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.text('Hvala na kupovini!', 105, footerY, null, null, 'center');
  
    // Preuzimanje PDF-a
    doc.save(`POTVRDA_${orderDetails.id}.pdf`);
  };
  

  if (loading) {
    return <div>Učitavanje detalja porudžbine...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-icon">✔️</div>
      <h1>Vaša narudžbina je uspešno kreirana!</h1>
      <div className="order-details">
        <p><strong>ID narudžbine:</strong> {orderDetails.id}</p>
        <p><strong>Ukupna cena:</strong> {orderDetails.total_price} RSD</p>
        <p><strong>Status:</strong> {orderDetails.status}</p>
        <p><strong>Datum narudžbine:</strong> {new Date(orderDetails.order_date).toLocaleString()}</p>
      </div>
      <button className="download-invoice-button" onClick={generatePDFInvoice}>Preuzmi potvrdu (PDF)</button>
    </div>
  );
};

export default OrderConfirmationPage;
