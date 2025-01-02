 
import React from 'react';

const ProductCard = ({ name, price, imageUrl, category }) => {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>Kategorija: {category || 'Nepoznato'}</p>
      <p>Cena: {price}</p>
    </div>
  );
};

export default ProductCard;
