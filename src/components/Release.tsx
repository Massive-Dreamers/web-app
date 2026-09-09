import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle2 } from 'lucide-react';
import steamLogo from '../assets/steamlogo.png';
import '../styles/Release.css';

export default function Release() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="release-section" id="release">
      {/* Background Image & Vignette */}
      <div className="release-bg"></div>
      <div className="release-vignette"></div>
      
      <div className="release-container">
        <motion.div 
          className="release-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="release-tag">Coming to PC</div>
          <h1 className="release-year">2027</h1>
          
          <div className="release-action">
            <button className="wishlist-btn">
              <img src={steamLogo} alt="Steam" className="steam-btn-icon" />
              Wishlist Now <span>→</span>
            </button>
            <button className="notify-btn" onClick={() => setIsModalOpen(true)}>
              <Bell size={15} /> Get Notified
            </button>
          </div>
        </motion.div>
      </div>

      {/* Notification Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="notify-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div 
              className="notify-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button className="notify-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="notify-modal-icon">
                    <Bell size={24} />
                  </div>
                  <h3 className="notify-modal-title">Be the First to Know</h3>
                  <p className="notify-modal-desc">
                    Subscribe with your email to receive an instant update when <strong>Mind Your Stay</strong> officially launches.
                  </p>
                  <form onSubmit={handleSubmit} className="notify-modal-form">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="notify-modal-input" 
                    />
                    <button type="submit" className="notify-modal-submit">
                      Notify Me
                    </button>
                  </form>
                </>
              ) : (
                <div className="notify-modal-success">
                  <CheckCircle2 size={36} color="var(--accent-orange)" />
                  <h3 className="notify-modal-title">You're on the list!</h3>
                  <p className="notify-modal-desc">
                    You'll be the first to know the moment Safe Haven opens its doors in 2027.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
