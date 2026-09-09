import { motion } from 'framer-motion';
import buildingsBg from '../assets/buildings.png';
import '../styles/FinalCTA.css';

export default function FinalCTA() {
  return (
    <section className="final-cta-section" id="cta">
      {/* Background Buildings Art & Atmosphere */}
      <div className="final-cta-bg">
        <img src={buildingsBg} alt="City Buildings" className="final-cta-bg-img" />
        <div className="final-cta-vignette"></div>
      </div>

      <div className="final-cta-container">
        <motion.div 
          className="final-cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="cta-title">
            MIND<br />YOUR STAY
          </h1>
          
          <div className="cta-newsletter-wrapper">
            <p className="cta-newsletter-text">Join the list and become part of this world.</p>
            <div className="cta-newsletter-form">
              <input type="email" placeholder="Enter your email" className="cta-newsletter-input" />
              <button className="cta-newsletter-btn">Stay Up-to-Date</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
