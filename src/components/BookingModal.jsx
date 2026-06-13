import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const WHATSAPP_NUMBER = '919994721988'; // Replace with your WhatsApp number (country code + number, no +)

const BookingModal = ({ isOpen, onClose, packageName }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    destination: packageName || '',
    date: '',
    travelers: '2',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef(null);

  // Pre-fill destination when packageName changes
  useEffect(() => {
    setForm(prev => ({ ...prev, destination: packageName || '' }));
  }, [packageName]);

  // Reset form & focus when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setForm(prev => ({ ...prev, destination: packageName || '' }));
      setTimeout(() => firstInputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg =
      `🌏 *New Booking Request – JK Tours & Travels*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `📧 *Email:* ${form.email || 'Not provided'}\n` +
      `📍 *Destination:* ${form.destination}\n` +
      `📅 *Travel Date:* ${form.date || 'Flexible'}\n` +
      `👥 *Travelers:* ${form.travelers}\n` +
      `💬 *Message:* ${form.message || 'No additional message'}`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  if (!isOpen) return null;

  // Use React Portal — renders outside any stacking context / overflow:hidden parent
  return createPortal(
    <div
      className="bm-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`bm-modal ${submitted ? 'bm-submitted' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Book Your Trip"
      >
        {/* Close button */}
        <button className="bm-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="bm-header">
          <div className="bm-header-icon">✈️</div>
          <h2 className="bm-title">Book Your Dream Trip</h2>
          <p className="bm-subtitle">Fill the form below — we'll confirm via WhatsApp!</p>
        </div>

        {submitted ? (
          <div className="bm-success">
            <div className="bm-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="48" height="48">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Booking Sent!</h3>
            <p>Opening WhatsApp to complete your booking…</p>
          </div>
        ) : (
          <form className="bm-form" onSubmit={handleSubmit} noValidate>
            <div className="bm-row">
              <div className="bm-field">
                <label className="bm-label">Full Name *</label>
                <input
                  ref={firstInputRef}
                  className="bm-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Karthik Kumar"
                  required
                  id="bm-name"
                />
              </div>
              <div className="bm-field">
                <label className="bm-label">Phone Number *</label>
                <input
                  className="bm-input"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 99999 00000"
                  required
                  id="bm-phone"
                />
              </div>
            </div>

            <div className="bm-row">
              <div className="bm-field">
                <label className="bm-label">Email Address</label>
                <input
                  className="bm-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  id="bm-email"
                />
              </div>
              <div className="bm-field">
                <label className="bm-label">Destination *</label>
                <select
                  className="bm-input bm-select"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  required
                  id="bm-destination"
                >
                  <option value="" disabled>Select destination</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Ooty">Ooty</option>
                  <option value="Kodaikanal">Kodaikanal</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Goa">Goa</option>
                  <option value="Pondicherry">Pondicherry</option>
                  <option value="Tirupati">Tirupati</option>
                  <option value="Manali">Manali</option>
                  <option value="Shimla">Shimla</option>
                  <option value="College IV Tour">College IV Tour</option>
                  <option value="Cab Service">Cab Service</option>
                  <option value="Other / Custom Tour">Other / Custom Tour</option>
                </select>
              </div>
            </div>

            <div className="bm-row">
              <div className="bm-field">
                <label className="bm-label">Travel Date</label>
                <input
                  className="bm-input"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  id="bm-date"
                />
              </div>
              <div className="bm-field">
                <label className="bm-label">Number of Travelers *</label>
                <select
                  className="bm-input bm-select"
                  name="travelers"
                  value={form.travelers}
                  onChange={handleChange}
                  required
                  id="bm-travelers"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5-10">5–10 People (Group)</option>
                  <option value="10-20">10–20 People (Group)</option>
                  <option value="20+">20+ People (Large Group)</option>
                </select>
              </div>
            </div>

            <div className="bm-field bm-full">
              <label className="bm-label">Special Requirements / Message</label>
              <textarea
                className="bm-input bm-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="e.g., Budget range, specific hotel preferences, pickup location…"
                rows={3}
                id="bm-message"
              />
            </div>

            <button type="submit" className="bm-submit" id="bm-submit-btn">
              <span className="bm-submit-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>
              Send via WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body   // ← Portal target: renders directly on body, escapes all stacking contexts
  );
};

export default BookingModal;
