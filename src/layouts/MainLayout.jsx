import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useScrollProgress } from '../hooks/useScrollProgress';

const MainLayout = () => {
  const scrollProgress = useScrollProgress();

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" style={{ width: `${scrollProgress}%` }}></div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating Gallery Button */}
      <a href="/gallery" className="gallery-float" aria-label="View Gallery" 
        style={{ position: 'fixed', bottom: '100px', right: '30px', background: 'linear-gradient(135deg, #f5a623, #f0932b)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(245, 166, 35, 0.4)', zIndex: 100, transition: 'transform 0.3s ease', textDecoration: 'none', color: 'white' }}>
        <span className="whatsapp-tooltip" style={{ bottom: '100px' }}>View Gallery</span>
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '30px', height: '30px' }}>
          <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
        </svg>
      </a>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/919445736002" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <span className="whatsapp-tooltip">Chat with us</span>
        <svg viewBox="0 0 24 24" fill="currentColor" className="whatsapp-icon">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.464L0 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm5.56-1.389c-.295-.149-1.748-.863-2.019-.962-.27-.099-.467-.149-.663.149-.197.297-.767.962-.94 1.159-.173.199-.347.224-.643.075-.296-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.296-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </a>
    </>
  );
};

export default MainLayout;
