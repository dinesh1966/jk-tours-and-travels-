import React, { useState } from 'react';
import { useTilt } from '../hooks/useTilt';
import BookingModal from './BookingModal';

const PackageCard = ({ pkg }) => {
  const tiltRef = useTilt({ maxTilt: 6 });
  const [modalOpen, setModalOpen] = useState(false);

  const handleBook = (e) => {
    // Ripple effect
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute; border-radius: 50%;
      background: rgba(255,255,255,0.4);
      width: 100px; height: 100px;
      left: ${e.clientX - rect.left - 50}px; top: ${e.clientY - rect.top - 50}px;
      animation: rippleOut 0.6s ease-out forwards;
      pointer-events: none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // Open booking modal
    setModalOpen(true);
  };

  return (
    <>
      <div className="package-card" ref={tiltRef}>
        {pkg.badge && <div className="package-badge">{pkg.badge}</div>}
        <div className="package-image">
          <img src={`/${pkg.image}`} alt={pkg.title} loading="lazy" decoding="async" />
        </div>
        <div className="package-content">
          <h3 className="package-title">{pkg.title}</h3>
          <div className="package-meta">
            <span>{pkg.meta}</span>
          </div>
          <div className="package-footer">
            <div className="package-price">
              <span className="price-amount">{pkg.priceType}</span> <br />
              {pkg.priceType === 'IRCTC' ? 'authorized' : 'available'}
            </div>
            <button className="package-book-btn" onClick={handleBook}>Book Now</button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={pkg.title}
      />
    </>
  );
};

export default PackageCard;
