import React, { useState } from "react";
import './css/LandingPage.css';

const LandingPage = () => {


   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/americano.png",
    "/images/Macchiato.png",
    "/images/expresso.png"
  ];

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="landing-page">

      <section className="hero-section">
       <div className="hero-content">
  <h1>Découvrez notre café exclusif</h1>
  <p>RECEVEZ 40% DE RÉDUCTION SUR VOTRE PREMIÈRE COMMANDE</p>
  <button className="download-btn">COMMANDER MAINTENANT</button>
  <div className="product-images">
    <img src="/images/food.png" alt="Café Espresso" />
    <img src="/images/food.png" alt="Café Latte" />
    <img src="/images/food.png" alt="Café Cappuccino" />
  </div>
</div>

<div className="hero-image">
  <div className="cafebanner-container">
    <img src="/images/coffee-grains.png" alt="Grains de Café" className="coffee-grains" />
    <img src="/images/cafebanner.png" alt="Café" className="cafebanner" />
  </div>
</div>


      </section>

        <div className="content" style={{
    backgroundColor: '#3a3a3a', 
    borderRadius: '8px',
    margin: '1%',
  }}>
        <div className="left-section">
          <h1>Quelle heure est-il ?</h1>
          <h2>HEURE DU CAFÉ</h2>
        </div>

        <div className="center-image">
          <img src={images[currentImageIndex]} alt="Affichage Circulaire de Café" />
          <div className="pagination">
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </div>
        </div>


        <div className="right-section">
          <div className="card">
            <img src="/images/cafebanner.png" alt="Latte" className="card-image" />
            <div className="card-content">
              <h3>LATTE</h3>
              <p>
                Le caffè latte est une boisson à base de café préparée avec de l'espresso et du lait mousseux. Le terme vient de l'italien
                caffè e latte, qui signifie "café et lait".
              </p>
              <button className="order-now">Commander Maintenant</button>
            </div>
          </div>  
        </div>
      </div>

      <section className="features-section" style={{
    backgroundColor: '#4a4a4a', 
    borderRadius: '8px',
    margin: '1%',
  }}>
        <h2>Les Fonctionnalités de Notre Application</h2>
        <div className="features">
          <div className="feature">
            <img src="/images/food.png" alt="Facile à Commander" />
            <p>Facile à Commander</p>
          </div>
          <div className="feature">
            <img src="/images/food.png" alt="Livraison Rapide" />
            <p>Livraison Rapide</p>
          </div>
          <div className="feature">
            <img src="/images/food.png" alt="Paiement Sécurisé" />
            <p>Paiement Sécurisé</p>
          </div>
        </div>
      </section>

        <section className="partners-section" style={{
    backgroundColor: '#595959', 
    borderRadius: '8px',
    margin: '1%',
  }}>
        <div className="partners">
          {/* Shel */}
          <svg className="partner-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <circle cx="12" cy="12" r="10" />
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" fill="#000">S</text>
          </svg>

          {/* Aziza */}
          <svg className="partner-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <rect x="4" y="4" width="16" height="16" />
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" fill="#000">A</text>
          </svg>

          {/* Avantis */}
          <svg className="partner-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <path d="M12 2L2 12l10 10 10-10L12 2z" />
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" fill="#000">Av</text>
          </svg>

          {/* Géant */}
          <svg className="partner-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <polygon points="12,2 2,22 22,22" />
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" fill="#000">G</text>
          </svg>

          {/* Monoprix */}
          <svg className="partner-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <ellipse cx="12" cy="12" rx="10" ry="5" />
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" fill="#000">M</text>
          </svg>
        </div>
      </section>

        <section className="juice-section" style={{
    backgroundColor: '#6b6b6b', 
    borderRadius: '8px',
    margin: '1%',
  }}>
        <h2>Nos Jus Frais</h2>
        <div className="juices">
          <div className="juice">
            <img src="/images/orange-juice.png" alt="Jus d'Orange" />
            <h3>Jus d'Orange</h3>
            <p>Un jus frais d'orange pressée, riche en vitamines C.</p>
          </div>
          <div className="juice">
            <img src="/images/lemon-juice.png" alt="Jus de Citron" />
            <h3>Jus de Citron</h3>
            <p>Un jus de citron rafraîchissant, idéal pour l'été.</p>
          </div>
          <div className="juice">
            <img src="/images/apple-juice.png" alt="Jus de Pomme" />
            <h3>Jus de Pomme</h3>
            <p>Un jus de pomme doux et naturellement sucré.</p>
          </div>
        </div>
      </section>

      <section className="services-section" style={{
    backgroundColor: '#7a7a7a', 
    borderRadius: '8px',
    margin: '1%',
  }}>
        <h2>Notre Application Offre Ces Services</h2>
        <div className="services">
          <div className="service">Livraison à Domicile</div>
          <div className="service">Pas de Frais de Livraison</div>
          <div className="service">Réductions Exceptionnelles</div>
          <div className="service">Restaurants en Vedette</div>
          <div className="service">Gagnez Votre Nourriture</div>
        </div>
      </section>


      <div className="container">
  <span className="big-circle" />
  <img src="img/shape.png" className="square" alt="" />
  <div className="form">
    <div className="contact-info">
      <h3 className="title">Let's get in touch</h3>
      <p className="text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum
        adipisci recusandae praesentium dicta!
      </p>
      <div className="info">
        <div className="information">
          <i className="fas fa-map-marker-alt" /> &nbsp; &nbsp;
          <p>92 Cherry Drive Uniondale, NY 11553</p>
        </div>
        <div className="information">
          <i className="fas fa-envelope" /> &nbsp; &nbsp;
          <p>lorem@ipsum.com</p>
        </div>
        <div className="information">
          <i className="fas fa-phone" />
          &nbsp;&nbsp;
          <p>123-456-789</p>
        </div>
      </div>
      <div className="social-media">
        <p>Connect with us :</p>
        <div className="social-icons">
          <a href="oo">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="oo">
            <i className="fab fa-twitter" />
          </a>
          <a href="oo">
            <i className="fab fa-instagram" />
          </a>
          <a href="oo">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </div>
    </div>
    <div className="contact-form">
      <span className="circle one" />
      <span className="circle two" />
      <form action="index.html" autoComplete="off">
        <h3 className="title">Contact us</h3>
        <div className="input-container">
          <input type="text" name="name" className="input" />
          <label htmlFor="">Username</label>
          <span>Username</span>
        </div>
        <div className="input-container">
          <input type="email" name="email" className="input" />
          <label htmlFor="">Email</label>
          <span>Email</span>
        </div>
        <div className="input-container">
          <input type="tel" name="phone" className="input" />
          <label htmlFor="">Phone</label>
          <span>Phone</span>
        </div>
        <div className="input-container textarea">
          <textarea name="message" className="input" defaultValue={""} />
          <label htmlFor="">Message</label>
          <span>Message</span>
        </div>
        <input type="submit" defaultValue="Send" className="btn" />
      </form>
    </div>
  </div>
</div>


       <footer className="footer" style={{
    backgroundColor: '#111', 
    color: '#ccc', 
    borderRadius: '8px',
    margin: '1%',
  }}>
        <p>RestoCafé est disponible pour Android et Apple.</p>
        <div className="app-links">
          <a href="oo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg></a>
          <a href="oo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.5-2.3-21.8 7.2-27.3 9.5-5.5 21.8-2.3 27.3 7.2l19.8 34.4 78.1-135.5c6.6-11.4 20.9-15.4 32.3-8.8s15.4 20.9 8.8 32.3l-78.1 135.5 47.6 81.4c6.4 11 2.6 24.7-8.7 31.1-11 6.4-24.7 2.6-31.1-8.7l-47.6-81.4zm126.3 75.3c-9.5 5.5-21.8 2.3-27.3-7.2L231.3 288c-10.3-12.5-23.5-16.3-39.6-11.4l-14.3 24.7c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4l32.1 55.8 32.2-55.8c10.3-12.5 23.5-16.3 39.6-11.4l14.3 24.7c5.5 9.6 2.3 21.8-7.3 27.3zM400 432H48V80h352v352z"/></svg></a>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
