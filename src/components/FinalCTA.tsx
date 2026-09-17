import { motion } from 'framer-motion';
import buildingsBg from '../assets/buildings.png';
import { useNewsletterSignup } from '../hooks/useNewsletterSignup';
import '../styles/FinalCTA.css';

export default function FinalCTA() {
  const signup = useNewsletterSignup('final-cta');

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
            <form className="cta-newsletter-form" onSubmit={signup.submit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="cta-newsletter-input"
                value={signup.email}
                onChange={(e) => signup.updateEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <input
                type="text"
                name="botcheck"
                className="newsletter-botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={signup.botcheck}
                onChange={(e) => signup.setBotcheck(e.target.value)}
              />
              <button type="submit" className="cta-newsletter-btn" disabled={signup.sending}>
                {signup.sending ? 'Sending' : 'Stay Up-to-Date'}
              </button>
            </form>
            <p className="cta-newsletter-msg" role="status" aria-live="polite">
              {signup.message}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
