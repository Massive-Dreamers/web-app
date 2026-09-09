import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import studioLogo from '../assets/studio_ship_transparent.png';
import '../styles/StudioHome.css';

// Lightweight Social SVG Icons (exported for use across pages)
export const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const LinkedinIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" r="2"/>
  </svg>
);

export const FacebookIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function StudioHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`studio-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="studio-header-container">
        <Link to="/" className="studio-logo">
          <img src={studioLogo} alt="Massive Dreamers" className="studio-header-logo-img" />
          <span>Massive Dreamers</span>
        </Link>

        <nav className="studio-nav">
          <NavLink to="/games" className={({ isActive }) => isActive ? 'active' : ''}>
            Games
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''}>
            Newswire
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact
          </NavLink>
        </nav>

        <div className="studio-header-actions">
          <a 
            href="https://store.steampowered.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="studio-header-subscribe-btn"
          >
            Wishlist
          </a>
        </div>
      </div>
    </header>
  );
}
