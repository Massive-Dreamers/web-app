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

// Public by design: Web3Forms access keys are meant to live in client code.
// They only allow submitting to the inbox they are bound to.
const WEB3FORMS_KEY = '21bd2254-512f-4aa0-8a81-b261b3d52f37';

const INQUIRY_LABELS: Record<string, string> = {
  general: 'General',
  press: 'Press & media',
  publishing: 'Publishing & partnerships',
  playtest: 'Playtesting',
  careers: 'Careers',
};

const EMPTY_FORM = { name: '', email: '', subject: 'general', message: '' };

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  // Honeypot: bots fill hidden fields, humans never see it.
  const [botcheck, setBotcheck] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          botcheck,
          from_name: 'massivedreamers.com',
          subject: `New ${INQUIRY_LABELS[formData.subject] ?? 'General'} inquiry`,
          name: formData.name,
          email: formData.email,
          inquiry: INQUIRY_LABELS[formData.subject] ?? formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData(EMPTY_FORM);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const update = (patch: Partial<typeof EMPTY_FORM>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
    // A stale "sent"/"failed" note next to the button would be confusing
    // once the visitor starts typing the next message.
    setStatus((prev) => (prev === 'idle' || prev === 'sending' ? prev : 'idle'));
  };

  const sending = status === 'sending';

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
                  onChange={(e) => update({ name: e.target.value })}
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
                  onChange={(e) => update({ email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject" className="form-label">Inquiry</label>
              <select
                id="subject"
                className="form-select"
                value={formData.subject}
                onChange={(e) => update({ subject: e.target.value })}
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
                onChange={(e) => update({ message: e.target.value })}
              />
            </div>

            <input
              type="text"
              name="botcheck"
              className="form-botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={botcheck}
              onChange={(e) => setBotcheck(e.target.value)}
            />

            <div className="contact-form-actions">
              <button type="submit" className="form-submit-btn" disabled={sending}>
                {sending ? 'Sending' : status === 'success' ? 'Sent' : 'Send'}
              </button>

              <span className="form-status-msg" role="status" aria-live="polite">
                {status === 'success' && 'Thank you. We’ll be in touch.'}
                {status === 'error' && (
                  <>
                    Something went wrong. Please email us at{' '}
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </>
                )}
              </span>
            </div>
          </form>
        </motion.section>

      </main>
      </div>

      <Footer />
    </div>
  );
}
