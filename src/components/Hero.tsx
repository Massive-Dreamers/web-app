import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import steamLogo from '../assets/steamlogo.png';
import StudioHeader from './StudioHeader';
import '../styles/Hero.css';

export default function Hero() {
  const scrollToTrailer = () => {
    document.getElementById('trailer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section-exact">
      <div className="hero-bg">
        <div className="hero-vignette"></div>
      </div>
      
      {/* Studio Header (Massive Dreamers) */}
      <StudioHeader />

      {/* Main Content */}
      <div className="hero-content-wrapper">
        <div className="hero-container">
          <div className="hero-main-text">
            <motion.h1 
              className="hero-huge-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              MIND<br/>YOUR STAY
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle-exact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              An indie point & click game inspired heavily by the game mechanics and storytelling of Papers, Please and Disco Elysium.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button className="btn-solid">
                <img src={steamLogo} alt="Steam" className="steam-icon-btn" />
                Add to Wishlist
              </button>
              <button className="btn-outline" onClick={scrollToTrailer}>
                Watch Trailer <Play size={13} fill="currentColor" className="icon-right" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
