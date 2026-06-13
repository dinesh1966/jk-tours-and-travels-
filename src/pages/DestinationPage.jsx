import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { destinationDetails } from '../data/destinationPlaces';
import { useTilt } from '../hooks/useTilt';
import BookingModal from '../components/BookingModal';

const PlaceCard = ({ place, index }) => {
  const cardRef = useRef(null);
  const tiltRef = useTilt({ maxTilt: 3, hasGlare: false });
  const [modalOpen, setModalOpen] = useState(false);

  const handleBookNow = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  return (
    <>
      <div
        className="package-card opacity-0 translate-y-10 reveal-card"
        style={{ transitionDelay: `${index * 100}ms` }}
        ref={(el) => {
          cardRef.current = el;
          if (tiltRef && typeof tiltRef === 'function') tiltRef(el);
          else if (tiltRef && tiltRef.current !== undefined) tiltRef.current = el;
        }}
        data-tilt
        data-tilt-max="6"
      >
        <div className="package-image">
          <img
            src={`/${place.image}`}
            alt={place.title}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="package-content">
          <h3 className="package-title">{place.title}</h3>
          <p>{place.desc}</p>
          <div className="package-footer">
            <button
              className="package-book-btn"
              style={{ width: '100%', marginTop: '10px' }}
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={place.title}
      />
    </>
  );
};

const DestinationPage = () => {
  const { id } = useParams();
  const destData = destinationDetails[id];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Trigger fade-up animations on load
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-card').forEach((el) => {
        el.classList.remove('opacity-0', 'translate-y-10');
        el.classList.add('opacity-100', 'translate-y-0');
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [id]);

  if (!destData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="dest-hero">
        <img
          src={`/${destData.heroImage}`}
          alt={destData.title.replace('Explore ', '')}
        />
        <div className="dest-hero-content">
          <h1 className="opacity-0 translate-y-10 reveal-card transition-all duration-700">
            Explore <span>{destData.title.replace('Explore ', '')}</span>
          </h1>
          <p className="opacity-0 translate-y-10 reveal-card transition-all duration-700 delay-100">
            {destData.subtitle}
          </p>
          <div className="breadcrumb opacity-0 translate-y-10 reveal-card transition-all duration-700 delay-200">
            <Link to="/">Home</Link> / <Link to="/#destinations">Destinations</Link> / {destData.title.replace('Explore ', '')}
          </div>
        </div>
      </section>

      {/* Tour Places Section */}
      <section className="places-section">
        <div className="container">
          <h2 className="section-title opacity-0 translate-y-10 reveal-card transition-all duration-700 delay-300">
            <strong>Top Tour Places</strong>
          </h2>

          <div className="packages-grid">
            {destData.places.map((place, index) => (
              <PlaceCard key={index} place={place} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationPage;
