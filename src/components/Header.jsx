import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/bg fina one.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeHash, setActiveHash] = useState('#home');
  const location = useLocation();

  const handleDropdownClick = (e) => {
    if (window.innerWidth < 1025) {
      e.preventDefault();
      e.stopPropagation();
      setDestinationsOpen(!destinationsOpen);
    }
  };

  const handleSubmenuClick = (e, name) => {
    if (window.innerWidth < 1025) {
      e.preventDefault();
      e.stopPropagation();
      setActiveSubmenu(activeSubmenu === name ? null : name);
    }
  };

  const handleNavClick = (e) => {
    const target = e.target.closest('a');
    if (target && !target.classList.contains('dropdown-toggle') && !target.classList.contains('submenu-toggle')) {
      setMenuOpen(false);
      setDestinationsOpen(false);
      setActiveSubmenu(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Update active hash
      const sections = ['home', 'destinations', 'services', 'about'];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop - 120;
          if (window.scrollY >= sectionTop) {
            setActiveHash('#' + sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDestinationsOpen(false);
    setActiveSubmenu(null);
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#contact';
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHome = location.pathname === '/';

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <Link to="/" className="logo-link" id="logo">
          <div className="logo-circle-container">
            <img src={logoImg} alt="JK Tours & Travels" className="logo-img" />
          </div>
        </Link>

        <nav>
          <ul className={`nav-menu ${menuOpen ? 'mobile-open' : ''}`} id="navMenu" onClick={handleNavClick}>
            <li className={`nav-item ${isHome && activeHash === '#home' ? 'active' : ''}`}>
              <a href={isHome ? '#home' : '/#home'}>Home</a>
            </li>
            <li className={`nav-item dropdown ${isHome && activeHash === '#destinations' ? 'active' : ''} ${destinationsOpen ? 'mobile-dropdown-open' : ''}`}>
              <a href={isHome ? '#destinations' : '/#destinations'} className="dropdown-toggle" onClick={handleDropdownClick}>Destinations ▼</a>
              <ul className={`dropdown-menu ${destinationsOpen ? 'show-mobile' : ''}`}>
                <li className={`dropdown-submenu ${activeSubmenu === 'coimbatore' ? 'mobile-submenu-open' : ''}`}>
                  <Link to="/coimbatore" className="submenu-toggle" onClick={(e) => handleSubmenuClick(e, 'coimbatore')}>Coimbatore ▸</Link>
                  <ul className={`dropdown-menu ${activeSubmenu === 'coimbatore' ? 'show-mobile' : ''}`}>
                    <li><Link to="/coimbatore">Adiyogi Shiva Statue</Link></li>
                    <li><Link to="/coimbatore">Marudhamalai Temple</Link></li>
                    <li><Link to="/coimbatore">Perur Pateeswarar Temple</Link></li>
                    <li><Link to="/coimbatore">VOC Park and Zoo</Link></li>
                    <li><Link to="/coimbatore">Kovai Kutralam Falls</Link></li>
                    <li><Link to="/coimbatore">Valparai</Link></li>
                    <li><Link to="/coimbatore">Topslip</Link></li>
                    <li><Link to="/coimbatore">Aliyar Dam</Link></li>
                    <li><Link to="/coimbatore">Monkey Falls</Link></li>
                  </ul>
                </li>
                <li className={`dropdown-submenu ${activeSubmenu === 'ooty' ? 'mobile-submenu-open' : ''}`}>
                  <Link to="/ooty" className="submenu-toggle" onClick={(e) => handleSubmenuClick(e, 'ooty')}>Ooty ▸</Link>
                  <ul className={`dropdown-menu ${activeSubmenu === 'ooty' ? 'show-mobile' : ''}`}>
                    <li><Link to="/ooty">Botanical Garden</Link></li>
                    <li><Link to="/ooty">Doddabetta</Link></li>
                    <li><Link to="/ooty">Ooty Lake</Link></li>
                    <li><Link to="/ooty">Pykara</Link></li>
                    <li><Link to="/ooty">Rose Garden</Link></li>
                  </ul>
                </li>
                <li className={`dropdown-submenu ${activeSubmenu === 'kodaikanal' ? 'mobile-submenu-open' : ''}`}>
                  <Link to="/kodaikanal" className="submenu-toggle" onClick={(e) => handleSubmenuClick(e, 'kodaikanal')}>Kodaikanal ▸</Link>
                  <ul className={`dropdown-menu ${activeSubmenu === 'kodaikanal' ? 'show-mobile' : ''}`}>
                    <li><Link to="/kodaikanal">Kodaikanal Lake</Link></li>
                    <li><Link to="/kodaikanal">Coaker's Walk</Link></li>
                    <li><Link to="/kodaikanal">Bryant Park</Link></li>
                    <li><Link to="/kodaikanal">Pillar Rocks</Link></li>
                    <li><Link to="/kodaikanal">Guna Caves</Link></li>
                    <li><Link to="/kodaikanal">Pine Forest</Link></li>
                    <li><Link to="/kodaikanal">Silver Cascade Falls</Link></li>
                    <li><Link to="/kodaikanal">Moir Point</Link></li>
                    <li><Link to="/kodaikanal">Green Valley View</Link></li>
                  </ul>
                </li>
                <li className={`dropdown-submenu ${activeSubmenu === 'south-india' ? 'mobile-submenu-open' : ''}`}>
                  <Link to="/south-india" className="submenu-toggle" onClick={(e) => handleSubmenuClick(e, 'south-india')}>South India ▸</Link>
                  <ul className={`dropdown-menu ${activeSubmenu === 'south-india' ? 'show-mobile' : ''}`}>
                    <li><Link to="/south-india">Madurai</Link></li>
                    <li><Link to="/south-india">Thanjavur</Link></li>
                    <li><Link to="/south-india">Kumbakonam</Link></li>
                    <li><Link to="/south-india">Rameswaram</Link></li>
                    <li><Link to="/south-india">Kanniyakumari</Link></li>
                    <li><Link to="/south-india">Yercaud</Link></li>
                  </ul>
                </li>
                <li className={`dropdown-submenu ${activeSubmenu === 'kerala' ? 'mobile-submenu-open' : ''}`}>
                  <Link to="/kerala" className="submenu-toggle" onClick={(e) => handleSubmenuClick(e, 'kerala')}>Kerala ▸</Link>
                  <ul className={`dropdown-menu ${activeSubmenu === 'kerala' ? 'show-mobile' : ''}`}>
                    <li><Link to="/kerala">Munnar</Link></li>
                    <li><Link to="/kerala">Wayanad</Link></li>
                    <li><Link to="/kerala">Varkala</Link></li>
                    <li><Link to="/kerala">Kovalam</Link></li>
                    <li><Link to="/kerala">Nelliyampathy</Link></li>
                    <li><Link to="/kerala">Guruvayur</Link></li>
                    <li><Link to="/kerala">Sabarimala Ayyappan Temple</Link></li>
                  </ul>
                </li>
                <li className={`dropdown-submenu ${activeSubmenu === 'karnataka' ? 'mobile-submenu-open' : ''}`}>
                  <Link to="/karnataka" className="submenu-toggle" onClick={(e) => handleSubmenuClick(e, 'karnataka')}>Karnataka ▸</Link>
                  <ul className={`dropdown-menu ${activeSubmenu === 'karnataka' ? 'show-mobile' : ''}`}>
                    <li><Link to="/karnataka">Coorg</Link></li>
                    <li><Link to="/karnataka">Mysore Palace</Link></li>
                    <li><Link to="/karnataka">Chikmagalur</Link></li>
                    <li><Link to="/karnataka">Hampi</Link></li>
                    <li><Link to="/karnataka">Jog Falls</Link></li>
                    <li><Link to="/karnataka">Gokarna</Link></li>
                    <li><Link to="/karnataka">Bandipur National Park</Link></li>
                    <li><Link to="/karnataka">Udupi</Link></li>
                    <li><Link to="/karnataka">Murudeshwar Temple</Link></li>
                  </ul>
                </li>
                <li className={`dropdown-submenu ${activeSubmenu === 'goa' ? 'mobile-submenu-open' : ''}`}>
                  <Link to="/goa" className="submenu-toggle" onClick={(e) => handleSubmenuClick(e, 'goa')}>Goa ▸</Link>
                  <ul className={`dropdown-menu ${activeSubmenu === 'goa' ? 'show-mobile' : ''}`}>
                    <li><Link to="/goa">Baga Beach</Link></li>
                    <li><Link to="/goa">Calangute Beach</Link></li>
                    <li><Link to="/goa">Anjuna Beach</Link></li>
                    <li><Link to="/goa">Fort Aguada</Link></li>
                    <li><Link to="/goa">Chapora Fort</Link></li>
                    <li><Link to="/goa">Palolem Beach</Link></li>
                    <li><Link to="/goa">Dudhsagar Falls</Link></li>
                    <li><Link to="/goa">Cabo de Rama Fort</Link></li>
                  </ul>
                </li>
                <li className={`dropdown-submenu ${activeSubmenu === 'pondicherry' ? 'mobile-submenu-open' : ''}`}>
                  <Link to="/pondicherry" className="submenu-toggle" onClick={(e) => handleSubmenuClick(e, 'pondicherry')}>Pondicherry ▸</Link>
                  <ul className={`dropdown-menu ${activeSubmenu === 'pondicherry' ? 'show-mobile' : ''}`}>
                    <li><Link to="/pondicherry">Paradise Beach</Link></li>
                    <li><Link to="/pondicherry">Rock Beach</Link></li>
                    <li><Link to="/pondicherry">Promenade Beach</Link></li>
                    <li><Link to="/pondicherry">Auroville & Matrimandir</Link></li>
                    <li><Link to="/pondicherry">Sri Aurobindo Ashram</Link></li>
                    <li><Link to="/pondicherry">Manakula Vinayagar Temple</Link></li>
                    <li><Link to="/pondicherry">French Colony (White Town)</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className={`nav-item ${isHome && activeHash === '#services' ? 'active' : ''}`}>
              <a href={isHome ? '#services' : '/#services'}>Services</a>
            </li>
            <li className={`nav-item ${isHome && activeHash === '#about' ? 'active' : ''}`}>
              <a href={isHome ? '#about' : '/#about'}>About Us</a>
            </li>
          </ul>
        </nav>

        <div className="nav-right">
          <div className="nav-phone">
            <div className="phone-icon-wrap">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <div className="phone-text">
              <span className="phone-number">+91 94457 36002</span>
              <span className="phone-label">24/7 Support</span>
            </div>
          </div>
          <button className="book-now-btn" onClick={scrollToContact}>
            Book Now
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
          </button>
        </div>

        <button 
          className={`hamburger ${menuOpen ? 'open' : ''}`} 
          id="hamburger" 
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
