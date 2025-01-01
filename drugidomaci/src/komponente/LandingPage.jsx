import React from 'react';
 

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Dobrodošli na Vašu Online Prodavnicu</h1>
          <p>Pronađite ili prodajte sve što Vam je potrebno - brzo i jednostavno!</p>
          <button className="cta-button">Pogledajte Proizvode</button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Istaknuti Proizvodi</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Proizvod 1" />
            <h3>Laptop Dell Inspiron</h3>
            <p>85,000 RSD</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Proizvod 2" />
            <h3>Pametni Telefon</h3>
            <p>65,000 RSD</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Proizvod 3" />
            <h3>Knjiga Laravel</h3>
            <p>1,500 RSD</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <h2>Šta Naši Korisnici Kažu</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <p>"Odličan sajt! Sve sam pronašao na jednom mestu."</p>
            <h4>- Marko Jovanović</h4>
          </div>
          <div className="review-card">
            <p>"Prodaja je brza i laka, svakako preporučujem."</p>
            <h4>- Ana Petrović</h4>
          </div>
          <div className="review-card">
            <p>"Kupio sam telefon i stigao je isti dan, sjajno!"</p>
            <h4>- Nikola Nikolić</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Postanite Deo Naše Zajednice!</h2>
        <button className="cta-button">Registrujte Se Besplatno</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Vaša Prodavnica. Sva Prava Zadržana.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
