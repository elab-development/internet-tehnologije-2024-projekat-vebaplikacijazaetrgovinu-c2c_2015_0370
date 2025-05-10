import React, { useState } from 'react';
import StarRating from './StarRating';

const ReviewComponent = ({ onSubmitReview }) => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmitReview(userRating, comment);
  };

  return (
    <div className="review-form">
      <h3>Ostavite recenziju</h3>
      <StarRating rating={userRating} onRatingChange={setUserRating} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Unesite opisnu ocenu..."
        rows="4"
        cols="50"
        style={{ width: '100%', margin: '10px 0' }}
      />
      <button onClick={handleSubmit} disabled={!userRating}>
        Pošalji recenziju
      </button>
    </div>
  );
};

export default ReviewComponent;
