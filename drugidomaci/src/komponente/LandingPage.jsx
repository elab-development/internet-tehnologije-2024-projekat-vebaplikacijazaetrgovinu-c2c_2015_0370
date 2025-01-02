import React from 'react';
import Navbar from './Navbar'; 
const LandingPage = () => {
  return (
    <div className="landing-page">
    
    

      {/* Categories Section */}
      <section className="categories">
        <h2>Kategorije</h2>
        <div className="categories-grid">
          <div className="category-card">Elektronika</div>
          <div className="category-card">Nekretnine</div>
          <div className="category-card">Automobili</div>
          <div className="category-card">Kućni Ljubimci</div>
          <div className="category-card">Odeća i Obuća</div>
          <div className="category-card">Sport i Rekreacija</div>
        </div>
      </section>

      {/* Featured Ads Section */}
      <section className="featured-ads">
        <h2>Istaknuti Oglasi</h2>
        <div className="ads-grid">
          <div className="ad-card">
            <img src="https://via.placeholder.com/150" alt="Oglas 1" />
            <h3>iPhone 13 Pro</h3>
            <p>Cena: 120,000 RSD</p>
            <button className="view-ad-button">Pogledaj</button>
          </div>
          <div className="ad-card">
            <img src="https://via.placeholder.com/150" alt="Oglas 2" />
            <h3>Stan u Beogradu</h3>
            <p>Cena: 120,000 EUR</p>
            <button className="view-ad-button">Pogledaj</button>
          </div>
          <div className="ad-card">
            <img src="https://via.placeholder.com/150" alt="Oglas 3" />
            <h3>Škoda Octavia</h3>
            <p>Cena: 8,000 EUR</p>
            <button className="view-ad-button">Pogledaj</button>
          </div>
          <div className="ad-card">
            <img src="https://via.placeholder.com/150" alt="Oglas 4" />
            <h3>Bicikl MTB</h3>
            <p>Cena: 35,000 RSD</p>
            <button className="view-ad-button">Pogledaj</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <p><a href="#about">O Nama</a></p>
          <p><a href="#help">Pomoć</a></p>
          <p><a href="#contact">Kontakt</a></p>
        </div>
        <p>© 2024 Kupuj & Prodaj. Sva Prava Zadržana.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
