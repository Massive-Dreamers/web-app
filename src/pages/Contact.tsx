import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import AbstractField from '../components/AbstractField';
import '../styles/StudioHome.css';
import '../styles/Contact.css';

const easeOut = [0.16, 1, 0.3, 1] as const;

const EMAIL = 'info@massivedreamers.com';

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

      <div className="contact-content-wrap">
        <div className="contact-bg" aria-hidden>
          <AbstractField />
        </div>

        <main className="studio-container contact-main">
        <motion.section
          className="contact-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeOut }}
        >
          <h1 className="contact-hero-title">
            <span className="contact-hero-line">Say hello.</span>
            <a
              href={`mailto:${EMAIL}`}
              className="contact-hero-email"
            >
              {EMAIL}
              <ArrowUpRight className="contact-hero-email-arrow" size={44} />
            </a>
          </h1>

          <p className="contact-hero-subtitle">
            Press, publishing, playtesting, or a note. We read everything.
          </p>
        </motion.section>

        <motion.section
          className="contact-form-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: easeOut }}
        >
          <div className="contact-form-heading">
            <h2>Or send a message.</h2>
            <p>Fill out the form and we&rsquo;ll get back within a few days.</p>
          </div>

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

      </main>
      </div>

      <Footer />
    </div>
  );
}
