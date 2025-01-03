import React from 'react';

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));
    return (
      <svg
        key={index}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="star"
      >
        <defs>
          <linearGradient id={`star-gradient-${index}`}>
            <stop offset={`${fillPercentage}%`} stopColor="#ffcc00" />
            <stop offset={`${fillPercentage}%`} stopColor="#e0e0e0" />
          </linearGradient>
        </defs>
        <path
          d="M12 .587l3.668 7.436 8.217 1.196-5.945 5.796 1.405 8.185L12 18.897l-7.345 3.803 1.405-8.185-5.945-5.796 8.217-1.196L12 .587z"
          fill={`url(#star-gradient-${index})`}
        />
      </svg>
    );
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
