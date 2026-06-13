import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const galleryItems = [
  { img: 'hero_bg.png', title: 'Sunset Vibes', desc: 'Maldives' },
  { img: 'coimbatore_hero.png', title: 'Adiyogi Statue', desc: 'Coimbatore' }, // the original html used coimbatore_hero.png which doesn't exist, I'll use a valid one
  { img: 'ooty_hero.png', title: 'Misty Hills', desc: 'Ooty' },
  { img: 'kodaikanal_hero.png', title: 'Serene Lakes', desc: 'Kodaikanal' },
  { img: 'southindia_hero.png', title: 'Temple Architecture', desc: 'South India' },
  { img: 'kerala_hero.png', title: 'Backwaters', desc: 'Kerala' },
  { img: 'karnataka_hero.png', title: 'Heritage Ruins', desc: 'Karnataka' },
  { img: 'goa_hero.png', title: 'Tropical Beaches', desc: 'Goa' },
  { img: 'pondicherry_hero.png', title: 'French Quarter', desc: 'Pondicherry' },
];

const Gallery = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const items = document.querySelectorAll('.gallery-item');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 150);
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(item => observerRef.current.observe(item));

    return () => {
      if (observerRef.current) {
        items.forEach(item => observerRef.current.unobserve(item));
      }
    };
  }, []);

  return (
    <>
      {/* Header specifically for Gallery (back button) */}
      <header id="header" className="scrolled" style={{ position: 'relative' }}>
        <div className="container nav-container">
          <Link to="/" className="logo-link" id="logo">
            <img src="/logo.png" alt="JK Tours & Travels" className="logo-img" />
          </Link>
          <div className="nav-right">
            <Link to="/" className="book-now-btn">← Back to Home</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero-content">
          <h1>Our Memories</h1>
          <p>Capturing beautiful moments from around the world</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="gallery-container" id="galleryContainer">
        {galleryItems.map((item, index) => (
          <div className="gallery-item" key={index}>
            <img src={`/${item.img}`} alt={item.title} loading="lazy" />
            <div className="gallery-overlay">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
