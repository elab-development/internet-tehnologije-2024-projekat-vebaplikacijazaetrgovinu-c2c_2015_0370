import React from 'react';
import Button from './Button';

const ProductCard = ({ name, price, imageUrl, category, onDetailsClick }) => {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>Kategorija: {category || 'Nepoznato'}</p>
      <p>Cena: {price}</p>
      <Button text="Detalji" onClick={onDetailsClick} className="details-button" />
    </div>
  );
};

export default ProductCard;
