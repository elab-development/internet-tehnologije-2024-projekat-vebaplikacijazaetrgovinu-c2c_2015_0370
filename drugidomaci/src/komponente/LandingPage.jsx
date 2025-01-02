import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'iPhone 13 Pro',
      price: '120,000 RSD',
      image: 'https://istyle.rs/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_13_pro_silver_pdp_image_position-1a__wwen_4_4_1.jpg',
    },
    {
      id: 2,
      name: 'Stan u Beogradu',
      price: '120,000 EUR',
      image: 'https://moja4zida.rs/wp-content/uploads/2023/03/sajt2.png',
    },
    {
      id: 3,
      name: 'Škoda Octavia',
      price: '8,000 EUR',
      image: 'https://cdn.skoda-auto.com/images/sites/encom-v2/d2f646c4-d7bb-4ff7-aea7-073297017d84/d4176ec24dbd6a16ad73a7ee85b3dd2b/ModelCharacterGalleryModule/7632a1f0aa516594d6a0e94356eefae7250acf63669750b30971a08237c5496b/Default_bp1920_1.webp',
    },
    {
      id: 4,
      name: 'Bicikl MTB',
      price: '35,000 RSD',
      image: 'https://bikesport.rs/wp-content/uploads/2022/12/MY22TranceAdvancedPro291_ColorACarbonBlackDiamond.jpg',
    },
    {
      id: 5,
      name: 'Laptop Dell Inspiron',
      price: '85,000 RSD',
      image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3520/pdp/laptop-inspiron-15-3520-pdp-gallery-504x350-bk.psd?fmt=png-alpha&wid=570&hei=400',
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="landing-page">
      {/* Search Section */}
      <header className="search-header">
        <h1>Kupuj & Prodaj</h1>
       
      </header>

      {/* About Us Section */}
      <section className="about-us">
        <h2>O Nama</h2>
        <div className="about-us-content">
          <div className="about-text">
            <p>
              Dobrodošli na <strong>Kupuj & Prodaj</strong>, platformu kreiranu sa ciljem da
              poveže prodavce i kupce na jednostavan i efikasan način. Naša misija je da
              omogućimo sigurno, brzo i prijatno iskustvo trgovine za sve korisnike.
            </p>
            <p>
              Naš tim je posvećen pružanju najbolje usluge, konstantnom unapređenju i
              stvaranju zajednice zadovoljnih korisnika.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://www.workitdaily.com/media-library/happy-employees-on-a-successful-team.jpg?id=30117495&width=1245&height=700&quality=85&coordinates=0%2C66%2C0%2C28"
              alt="Tim Kupuj & Prodaj"
            />
          </div>
        </div>
      </section>

      {/* Featured Ads Section */}
      <section className="featured-ads">
        <h2>Istaknuti Proizvodi</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Šta tražite?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="ads-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="ad-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Cena: {product.price}</p>
              <button
                className="view-ad-button"
                onClick={() => navigate('/login')}
              >
                Pogledaj
              </button>
            </div>
          ))}
        </div>
      </section>

     
    </div>
  );
};

export default LandingPage;
