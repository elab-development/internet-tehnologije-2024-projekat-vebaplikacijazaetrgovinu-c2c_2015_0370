import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import ReviewComponent from './ReviewComponent'; // Uvozimo ReviewComponent

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const token = localStorage.getItem('auth_token'); // Pretpostavljamo da je token sačuvan u localStorage

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        setProductData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju detalja proizvoda.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleSubmitReview = async (rating, comment) => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/reviews',
        {
          rating,
          comment,
          product_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviewSubmitted(true);
    } catch (err) {
      setError('Greška pri slanju recenzije.');
    }
  };

  if (loading) {
    return <div>Učitavanje detalja proizvoda...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { product, average_rating } = productData;

  return (
    <div className="product-details-page">
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} />
      <p><strong>Kategorija:</strong> {product.category || 'Nepoznato'}</p>
      <p><strong>Opis:</strong> {product.description}</p>
      <p><strong>Cena:</strong> {product.price} RSD</p>
      <p><strong>Status:</strong> {product.status === 'active' ? 'Aktivan' : 'Neaktivan'}</p>
      <p><strong>Datum kreiranja:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
      <p><strong>Prosečna ocena:</strong> 
        <StarRating rating={parseFloat(average_rating)} />
      </p>

      {!reviewSubmitted ? (
        <ReviewComponent onSubmitReview={handleSubmitReview} /> // Dodajemo ReviewComponent
      ) : (
        <p>Hvala na oceni i komentaru!</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
