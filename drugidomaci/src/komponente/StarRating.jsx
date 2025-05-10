import React, { useState } from 'react';

const StarRating = ({ rating = 0, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleMouseEnter = (index) => setHoveredRating(index);
  const handleMouseLeave = () => setHoveredRating(null);
  const handleClick = (index) => onRatingChange(index);

  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = hoveredRating
          ? starValue <= hoveredRating
          : starValue <= rating;

        return (
          <svg
            key={index}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="star"
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            style={{ cursor: 'pointer' }}
          >
            <path
              d="M12 .587l3.668 7.436 8.217 1.196-5.945 5.796 1.405 8.185L12 18.897l-7.345 3.803 1.405-8.185-5.945-5.796 8.217-1.196L12 .587z"
              fill={isFilled ? "#ffcc00" : "#e0e0e0"}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
