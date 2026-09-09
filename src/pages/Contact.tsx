import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import StudioHeader, { InstagramIcon, LinkedinIcon, FacebookIcon } from '../components/StudioHeader';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const ledger = [
  { label: 'Press', value: 'press@massivedreamers.com', href: 'mailto:press@massivedreamers.com' },
  { label: 'Publishing', value: 'publishing@massivedreamers.com', href: 'mailto:publishing@massivedreamers.com' },
  { label: 'General', value: 'contact@massivedreamers.com', href: 'mailto:contact@massivedreamers.com' },
  { label: 'Studio', value: 'Baku, Azerbaijan', href: null },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 5000);
  };

  return (
    <div className="contact-page">
      <StudioHeader />

      <main className="studio-container contact-main">
        <motion.header
          className="contact-lede"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-meta">Get in touch</div>
          <h1 className="contact-title">Say hello.</h1>
          <p className="contact-subtitle">
            Press, publishing, playtesting, or a note. We read everything.
          </p>
        </motion.header>

        <div className="contact-grid">
          <motion.section
            className="contact-form-section"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject" className="form-label">Inquiry</label>
                <select
                  id="subject"
                  className="form-select"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="general">General</option>
                  <option value="press">Press &amp; media</option>
                  <option value="publishing">Publishing &amp; partnerships</option>
                  <option value="playtest">Playtesting</option>
                  <option value="careers">Careers</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  required
                  placeholder="What’s on your mind?"
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="contact-form-actions">
                <button type="submit" className="form-submit-btn">
                  {submitted ? 'Sent' : 'Send'}
                </button>
                {submitted && (
                  <span className="form-success-msg">
                    Thank you. We&rsquo;ll be in touch.
                  </span>
                )}
              </div>
            </form>
          </motion.section>

          <motion.aside
            className="contact-aside"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-aside-label">Direct</div>
            <ul className="contact-ledger">
              {ledger.map((row) => (
                <li key={row.label} className="contact-ledger-row">
                  <span className="contact-ledger-label">{row.label}</span>
                  {row.href ? (
                    <a href={row.href} className="contact-ledger-value">{row.value}</a>
                  ) : (
                    <span className="contact-ledger-value">{row.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="contact-press-kit">
              <div className="contact-aside-label">Press kit</div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Press kit download coming soon.');
                }}
                className="contact-press-link"
              >
                <span>Studio logos, key art, screenshots</span>
                <Download size={15} />
              </a>
            </div>

            <div className="contact-socials-block">
              <div className="contact-aside-label">Follow</div>
              <div className="contact-socials">
                <a
                  href="https://www.instagram.com/massivedreamersstudio?igsi=c2dqaGpoY3NiMmE0"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="contact-social-icon"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/company/massivedreamers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="contact-social-icon"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href="https://www.facebook.com/share/1JNquNFSpc/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="contact-social-icon"
                >
                  <FacebookIcon size={18} />
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
