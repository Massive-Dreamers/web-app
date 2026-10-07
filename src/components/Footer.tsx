import { Link } from 'react-router-dom';
import studioLogo from '../assets/studio_ship_transparent.png';
import { socials } from '../data/socials';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <img src={studioLogo} alt="Massive Dreamers" className="footer-logo-img" />
              <h3 className="footer-logo-text">Massive Dreamers</h3>
            </Link>
            <p className="footer-desc">
              An independent game development studio creating atmospheric, 
              story-driven narrative adventures with profound player choice.
            </p>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-link-group">
              <h4 className="footer-col-title">Studio</h4>
              <ul>
                <li><Link to="/games">Games</Link></li>
                <li><Link to="/news">Newswire</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-link-group">
              <h4 className="footer-col-title">Community</h4>
              <ul>
                {socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-link-group">
              <h4 className="footer-col-title">Legal</h4>
              <ul>
                <li><Link to="/contact">Support</Link></li>
                <li><Link to="/about">Privacy & Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">© {new Date().getFullYear()} Massive Dreamers. All Rights Reserved.</div>
        </div>
        
      </div>
    </footer>
  );
}
