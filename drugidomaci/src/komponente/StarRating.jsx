import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="star-rating">
      {'★'.repeat(fullStars)}
      {halfStar ? '☆' : ''}
      {'☆'.repeat(emptyStars)}
    </div>
  );
};

export default StarRating;
