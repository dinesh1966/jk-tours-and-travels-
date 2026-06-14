import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { useCounter } from '../hooks/useCounter';
import { useTilt } from '../hooks/useTilt';
import DestCard from '../components/DestCard';
import PackageCard from '../components/PackageCard';
import { destinationsData, packagesData } from '../data/destinations';

const StatItem = ({ num, label, iconClass, colorClass, suffix = '+', isCustom = false, svgPath }) => {
  const tiltRef = useTilt({ maxTilt: 5 });
  const countRef = useCounter(isCustom ? null : parseInt(num));

  return (
    <div className="stat-item glass-card" ref={tiltRef}>
      <div className={`stat-icon-wrap ${colorClass}`}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d={svgPath} />
        </svg>
      </div>
      <div className="stat-content">
        <div className="stat-number-wrap">
          {isCustom ? (
            <span className="stat-number-custom">{num}</span>
          ) : (
            <><span className="stat-number" ref={countRef}>0</span><span className="stat-suffix">{suffix}</span></>
          )}
        </div>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
};

const ServiceItem = ({ iconClass, label, svgPath }) => {
  const tiltRef = useTilt({ maxTilt: 15 });
  return (
    <div className="service-item" ref={tiltRef}>
      <div className={`service-icon-wrap ${iconClass}`}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d={svgPath} />
        </svg>
      </div>
      <span>{label}</span>
    </div>
  );
};

const Home = () => {
  useScrollReveal();
  const heroRef = useRef(null);
  useParallax(heroRef);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Load video after a short delay so it doesn't block initial page rendering
    const timer = setTimeout(() => setVideoLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    const dest = document.getElementById('destSelect')?.value || 'your destination';
    alert(`Searching for available tours to ${dest}!`);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Booking Request Sent successfully! We will contact you soon.');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Subscribed successfully!');
  };

  return (
    <>
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-bg">
          {videoLoaded && (
            <video autoPlay loop muted playsInline id="hero-bg-video">
              <source src={`${import.meta.env.BASE_URL}Adiyogi_coimbatore.mp4`} type="video/mp4" />
            </video>
          )}
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="explore-pill">
              <span className="explore-pill-text">EXPLORE. DREAM. DISCOVER.</span>
              <span className="explore-pill-plane">✈</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-your-world">Your World,</span>
              <span className="hero-our-journey">Our Journey.</span>
            </h1>

            <p className="hero-desc">
              Discover breathtaking destinations, handpicked experiences and unforgettable journeys with <span className="highlight-gold">JK Tours & Travels</span>.
            </p>

            <div className="hero-actions">
              <button className="cta-btn outline" onClick={() => document.getElementById('destinations')?.scrollIntoView({behavior:'smooth'})}>
                EXPLORE DESTINATIONS
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="cta-btn primary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>
                BOOK NOW
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="hero-badges">
            <HeroBadge 
              title="Best Price" sub="Guaranteed" colorClass="gold"
              svgPath="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            <HeroBadge 
              title="Secure" sub="Booking" colorClass="blue"
              svgPath="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            <HeroBadge 
              title="24/7" sub="Support" colorClass="purple"
              svgPath="M12 2c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-search-bar" data-tilt data-tilt-max="2">
            {/* Search fields omitted for brevity, adding interactive logic */}
            <div className="search-field" id="destinationField" onClick={() => document.getElementById('destSelect')?.showPicker?.()}>
              <div className="search-icon-wrap"></div>
              <div className="search-text-content">
                <span className="search-label">DESTINATION</span>
                <span className="search-placeholder" id="destPlaceholder">Where to?</span>
                <select className="hidden-select" id="destSelect" style={{position:'absolute',opacity:0,width:0,height:0}}
                  onChange={(e) => { document.getElementById('destPlaceholder').textContent = e.target.value; }}>
                  <option value="" disabled defaultValue>Where to?</option>
                  {destinationsData.map(d => <option key={d.id} value={d.title}>{d.title}</option>)}
                </select>
              </div>
            </div>
            
            <div className="search-divider"></div>
            
            <div className="search-field" onClick={() => document.getElementById('checkinInput')?.showPicker?.()}>
              <div className="search-icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>
              <div className="search-text-content">
                <span className="search-label">CHECK-IN</span>
                <span className="search-placeholder" id="checkinPlaceholder">Select date</span>
                <input type="date" className="hidden-date-picker" id="checkinInput" style={{position:'absolute',opacity:0,width:0,height:0}} 
                  onChange={(e) => { document.getElementById('checkinPlaceholder').textContent = new Date(e.target.value).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) }}/>
              </div>
            </div>

            <div className="search-divider"></div>

            <div className="search-field" onClick={() => document.getElementById('checkoutInput')?.showPicker?.()}>
               <div className="search-icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>
              <div className="search-text-content">
                <span className="search-label">CHECK-OUT</span>
                <span className="search-placeholder" id="checkoutPlaceholder">Select date</span>
                <input type="date" className="hidden-date-picker" id="checkoutInput" style={{position:'absolute',opacity:0,width:0,height:0}} 
                  onChange={(e) => { document.getElementById('checkoutPlaceholder').textContent = new Date(e.target.value).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) }}/>
              </div>
            </div>

            <div className="search-divider"></div>

            <div className="search-field" onClick={() => document.getElementById('travelersSelect')?.showPicker?.()}>
              <div className="search-icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
              </div>
              <div className="search-text-content">
                <span className="search-label">TRAVELERS</span>
                <span className="search-placeholder" id="travelersPlaceholder">2 Travelers, 1 Room</span>
                <select className="hidden-select" id="travelersSelect" style={{position:'absolute',opacity:0,width:0,height:0}}
                  onChange={(e) => { document.getElementById('travelersPlaceholder').textContent = e.target.value; }}>
                  <option value="1 Traveler, 1 Room">1 Traveler, 1 Room</option>
                  <option value="2 Travelers, 1 Room" defaultValue>2 Travelers, 1 Room</option>
                  <option value="2 Travelers, 2 Rooms">2 Travelers, 2 Rooms</option>
                  <option value="4 Travelers, 2 Rooms">4 Travelers, 2 Rooms</option>
                  <option value="Family Suite (5+)">Family Suite (5+)</option>
                </select>
              </div>
            </div>

            <button className="search-btn" aria-label="Search" onClick={handleSearch}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
          </div>
          
          <div className="stats-bar" style={{display: 'none'}}>
            <div className="stats-container">
              <StatItem num="12000" label="Happy Travelers" colorClass="gold" svgPath="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              <StatItem num="85" label="Countries" colorClass="blue" svgPath="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              <StatItem num="1500" label="Tours Completed" colorClass="orange" svgPath="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
              <StatItem num="4.8/5" label="Customer Rating" colorClass="green" isCustom={true} svgPath="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ POPULAR DESTINATIONS ═══════════ */}
      <section className="destinations" id="destinations">
        <div className="container">
          <div className="dest-section-header">
            <div className="dest-header-content">
              <span className="dest-pre-title">EXPLORE THE WORLD ✈</span>
              <h2 className="section-title dest-main-title">
                Popular Destinations
                <svg className="title-underline" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M0,10 Q100,20 200,5" fill="none" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </h2>
              <p className="dest-desc">Handpicked places around the world for unforgettable experiences.</p>
            </div>
          </div>

          <div className="packages-grid" style={{ marginTop: '40px' }}>
            {destinationsData.map(dest => (
              <DestCard key={dest.id} dest={dest} />
            ))}
          </div>

          <div className="view-all-dest-wrap">
            <a href="#contact" className="view-all-dest-btn">Custom Tour Available ➔</a>
          </div>

          {/* Banner Stats */}
          <div className="dest-banner">
            <div className="dest-banner-left">
              <h2 className="dest-banner-title">
                Your Journey,
                <span className="dest-banner-passion"> Our Passion</span>
              </h2>
              <p className="dest-banner-desc">We craft unforgettable travel experiences with comfort, trust & memories.</p>
              <button className="dest-banner-btn" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>Plan Your Trip →</button>
            </div>
            <div className="dest-banner-stats">
              <div className="banner-stat-card">
                <div className="banner-stat-icon blue">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                </div>
                <div className="banner-stat-num">12K+</div>
                <div className="banner-stat-label">Happy Travelers</div>
                <div className="banner-stat-sub">Trusted by thousands of travelers</div>
              </div>
              <div className="banner-stat-card">
                <div className="banner-stat-icon green">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                </div>
                <div className="banner-stat-num">50+</div>
                <div className="banner-stat-label">Places</div>
                <div className="banner-stat-sub">Exploring the beauty of the world</div>
              </div>
              <div className="banner-stat-card">
                <div className="banner-stat-icon purple">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /></svg>
                </div>
                <div className="banner-stat-num">1.5K+</div>
                <div className="banner-stat-label">Tours Completed</div>
                <div className="banner-stat-sub">Successful journeys and counting</div>
              </div>
              <div className="banner-stat-card">
                <div className="banner-stat-icon orange">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
                <div className="banner-stat-num">4.8/5</div>
                <div className="banner-stat-label">Customer Rating</div>
                <div className="banner-stat-sub">Loved by travelers worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRANSPORT SERVICES ═══════════ */}
      <section className="packages" id="packages">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <strong>JK Tours & Travels Transport Services</strong>
              <svg className="title-plane" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </h2>
            <a href="#contact" className="view-all-btn">Book Transport</a>
          </div>

          <div className="packages-grid">
            {packagesData.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ OUR SERVICES ═══════════ */}
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title center"><strong>Our Services</strong></h2>
          <div className="services-grid">
            <ServiceItem iconClass="flight" label="College IV Tours" svgPath="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm6.83 6.09L12 12.09 5.17 9.09 12 5.36l6.83 3.73zM5.5 15.5v3.81l6.5 3.5 6.5-3.5v-3.81l-6.5 3.5-6.5-3.5z" />
            <ServiceItem iconClass="cruise" label="Family Tours" svgPath="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            <ServiceItem iconClass="adventure" label="Adventure Tours" svgPath="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
            <ServiceItem iconClass="honeymoon" label="Honeymoon Tours" svgPath="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <ServiceItem iconClass="hotel" label="Room Booking" svgPath="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
            <ServiceItem iconClass="cab" label="Cab Service" svgPath="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            <ServiceItem iconClass="support" label="24/7 Support" svgPath="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
            <ServiceItem iconClass="visa" label="Custom Service" svgPath="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT US ═══════════ */}
      <section className="about-section" id="about" style={{ padding: '80px 0 40px', background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px' }}>
            <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
              <img src={`${import.meta.env.BASE_URL}hero_bg.png`} alt="About JK Travels" loading="lazy" decoding="async"
                style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: 'cover', aspectRatio: '4/3' }} />
            </div>
            <div style={{ flex: 1.2, minWidth: '300px' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Discover Our Story</span>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '15px 0 25px' }}><strong>About JK Tours & Travels</strong></h2>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>
                Welcome to JK Tours & Travels, your trusted partner in crafting unforgettable journeys. With years of experience in the travel industry, we specialize in offering personalized tour packages, from serene hill stations to vibrant coastal getaways. Our mission is to provide seamless, comfortable, and memorable travel experiences for every customer.
              </p>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.8 }}>
                Whether you're looking for a relaxing family vacation, an adventurous getaway, or a romantic honeymoon, we are here to plan the perfect trip tailored to your needs. Discover the world with us and create memories that last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT & NEWSLETTER ═══════════ */}
      <section className="contact-section-new" id="contact">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}><strong>Contact Us</strong></h2>
          <div className="contact-wrapper">
            <div className="booking-card" data-tilt data-tilt-max="2" data-tilt-glare data-tilt-max-glare="0.1">
              <h3>Book Your Dream Trip</h3>
              <p className="sub">Fill out the form below and we'll craft the perfect itinerary for you.</p>

              <form className="booking-form" onSubmit={handleBooking}>
                <div className="form-group-row">
                  <input type="text" className="form-input" placeholder="Full Name" required />
                  <input type="tel" className="form-input" placeholder="Phone Number" required />
                </div>
                <div className="form-group-row">
                  <input type="email" className="form-input" placeholder="Email Address" required />
                  <select className="form-input form-select" required defaultValue="">
                    <option value="" disabled>Select Destination</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Ooty">Ooty</option>
                    <option value="Kodaikanal">Kodaikanal</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Goa">Goa</option>
                    <option value="Pondicherry">Pondicherry</option>
                    <option value="Other">Other / Custom Tour</option>
                  </select>
                </div>
                <textarea className="form-input form-textarea" placeholder="Tell us about your trip (e.g., Dates, Number of people, Special Requirements)" required></textarea>
                <button type="submit" className="booking-btn">Send Booking Request</button>
              </form>
            </div>

            <div className="newsletter-card" data-tilt data-tilt-max="3">
              <div className="newsletter-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2zM4 6l8 5 8-5v2l-8 5-8-5V6z" />
                </svg>
              </div>
              <h3>Subscribe & Save</h3>
              <p>Join our newsletter to receive exclusive travel deals, insider tips, and destination inspiration directly in your inbox.</p>

              <form className="newsletter-form" onSubmit={handleSubscribe} style={{ width: '100%' }}>
                <div className="newsletter-input-group">
                  <input type="email" placeholder="Enter email address" required />
                  <button type="submit">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Simple internal component for Hero Badge
const HeroBadge = ({ title, sub, colorClass, svgPath }) => {
  const tiltRef = useTilt({ maxTilt: 8 });
  return (
    <div className="hero-badge" ref={tiltRef}>
      <div className={`badge-icon-wrap ${colorClass}`}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d={svgPath} />
        </svg>
      </div>
      <div className="badge-text-wrap">
        <span className="badge-title">{title}</span>
        <span className="badge-sub">{sub}</span>
      </div>
    </div>
  );
};

export default Home;
