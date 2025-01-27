import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import ReviewComponent from './ReviewComponent';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(5);
  const [sortBy, setSortBy] = useState('newest');
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        const reviewsResponse = await axios.get(`http://127.0.0.1:8000/api/reviews/product/${id}`);
        setProductData(productResponse.data);
        setAllReviews(reviewsResponse.data);
        setVisibleReviews(reviewsResponse.data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju detalja proizvoda ili recenzija.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const loadMoreReviews = () => {
    const nextReviews = allReviews.slice(visibleReviews.length, visibleReviews.length + 5);
    setVisibleReviews((prevReviews) => [...prevReviews, ...nextReviews]);
    setReviewsToShow((prevCount) => prevCount + 5);
  };

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
      const reviewsResponse = await axios.get(`http://127.0.0.1:8000/api/reviews/product/${id}`);
      setAllReviews(reviewsResponse.data);
      setVisibleReviews(reviewsResponse.data.slice(0, reviewsToShow));
    } catch (err) {
      setError('Greška pri slanju recenzije.');
    }
  };

  const handleSortChange = (event) => {
    const sortKey = event.target.value;
    setSortBy(sortKey);

    const sortedReviews = [...allReviews].sort((a, b) => {
      if (sortKey === 'newest') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortKey === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortKey === 'highest_rating') {
        return b.rating - a.rating;
      } else if (sortKey === 'lowest_rating') {
        return a.rating - b.rating;
      }
      return 0;
    });

    setAllReviews(sortedReviews);
    setVisibleReviews(sortedReviews.slice(0, reviewsToShow));
  };

  const formatDateForMySQL = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 19).replace('T', ' ');
  };

  const handleOrder = async () => {
    try {
      const formattedDate = formatDateForMySQL(new Date());
      const response = await axios.post(
        'http://127.0.0.1:8000/api/orders',
        {
          order_date: formattedDate,
          total_price: productData.product.price,
          status: 'pending',
          product_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderConfirmation(response.data.order);
      navigate(`/orders/${response.data.order.id}`);
    } catch (err) {
      setError('Greška pri kreiranju narudžbine.');
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

      <button className="order-button" onClick={handleOrder}>Naruči</button>

      {orderConfirmation && (
        <div className="order-confirmation">
          <h3>Potvrda narudžbine</h3>
          <p><strong>Broj narudžbine:</strong> {orderConfirmation.id}</p>
          <p><strong>Ukupna cena:</strong> {orderConfirmation.total_price} RSD</p>
          <p><strong>Status:</strong> {orderConfirmation.status}</p>
        </div>
      )}

      {!reviewSubmitted ? (
        <ReviewComponent onSubmitReview={handleSubmitReview} />
      ) : (
        <p>Hvala na oceni i komentaru!</p>
      )}

      <h3>Recenzije</h3>
      <div>
        <label htmlFor="sort-reviews">Sortiraj po: </label>
        <select id="sort-reviews" value={sortBy} onChange={handleSortChange}>
          <option value="newest">Najnovije</option>
          <option value="oldest">Najstarije</option>
          <option value="highest_rating">Najviše ocene</option>
          <option value="lowest_rating">Najniže ocene</option>
        </select>
      </div>

      {visibleReviews.map((review) => (
        <div key={review.id} className="review">
          <p><strong>{review.user?.name}</strong></p>
          <StarRating rating={review.rating} />
          <p>{review.comment}</p>
          <p><em>{new Date(review.created_at).toLocaleDateString()}</em></p>
        </div>
      ))}
      {visibleReviews.length < allReviews.length && (
        <button onClick={loadMoreReviews}>Prikaži još</button>
      )}
    </div>
  );
};

export default ProductDetailsPage;
