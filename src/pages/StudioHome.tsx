import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ArrowDown, X } from 'lucide-react';
import trailerVideo from '../assets/trailer.mp4';
import steamLogo from '../assets/steamlogo.png';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import AbstractField from '../components/AbstractField';
import { games } from '../data/games';
import { dispatches } from '../data/dispatches';
import '../styles/StudioHome.css';

const flagshipGame = games.find((g) => g.flagship);

const easeOut = [0.16, 1, 0.3, 1] as const;

const slate = games.map((g) => ({
  id: g.slug,
  index: g.index,
  title: g.title,
  status: g.statusLabel,
  release: g.release,
  genre: g.genre,
  image: g.image,
  href: g.href ?? '/games',
  flagship: g.flagship,
}));

const dispatchPreview = dispatches.slice(0, 3).map((d) => ({
  id: d.id,
  title: d.title,
  category: d.category,
  date: d.date,
  image: d.image,
  href: d.href,
}));

const pillars = [
  {
    number: '01',
    title: 'Deep narrative',
    body: 'Nuanced dialogue, morally difficult decisions, stories without easy answers.',
  },
  {
    number: '02',
    title: 'Handcrafted worlds',
    body: 'Every corridor, room, and document is authored. No procedural filler.',
  },
  {
    number: '03',
    title: 'Consequential agency',
    body: 'Choices leave marks. The world remembers what you did and what you refused.',
  },
];

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="home-hero" ref={ref}>
      <AbstractField />

      <div className="home-hero-scrim" aria-hidden />
      <div className="home-hero-vignette" aria-hidden />

      <motion.div className="home-hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="studio-container home-hero-inner">
          <motion.h1
            className="home-hero-title"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
            }}
          >
            <span className="home-hero-title-row home-hero-title-row-welcome">
              {['Welcome', 'to'].map((word, i) => (
                <span key={i} className="home-hero-title-clip">
                  <motion.span
                    className="home-hero-title-word"
                    variants={{
                      hidden: { y: '105%' },
                      visible: { y: '0%', transition: { duration: 0.9, ease: easeOut } },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="home-hero-title-row">
              {['Massive', 'Dreamers'].map((word, i) => (
                <span key={i} className="home-hero-title-clip">
                  <motion.span
                    className="home-hero-title-word"
                    variants={{
                      hidden: { y: '105%' },
                      visible: { y: '0%', transition: { duration: 1.05, ease: easeOut } },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="home-hero-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.55, ease: easeOut }}
          >
            We&rsquo;re an indie studio from Azerbaijan trying to turn dreams into reality.
          </motion.p>

          <motion.div
            className="home-hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.75, ease: easeOut }}
          >
            <Link to="/games" className="home-btn-primary">
              See our games <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="home-btn-ghost">
              About the studio
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="home-hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 2.2, ease: easeOut }}
      >
        <span>Scroll</span>
        <motion.span
          className="home-hero-scroll-arrow"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>

    </section>
  );
}

function FloatingPromo({ onClose }: { onClose: () => void }) {
  if (!flagshipGame) return null;

  return (
    <motion.aside
      className="home-floating-promo"
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.9,
          delay: 4.5,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.55, delay: 4.5, ease: 'easeOut' },
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.94,
        transition: { duration: 0.12, ease: 'easeOut' },
      }}
      aria-label="New game announcement"
    >
      <motion.div
        className="home-floating-promo-float"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5.4,
        }}
      >
        <button
          className="home-hero-promo-close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>

        <div className="home-floating-promo-inner">
      <Link to={flagshipGame.href ?? '/games'} className="home-hero-promo-media">
        <img src={flagshipGame.image} alt={flagshipGame.title} />
        <span className="home-hero-promo-tag">
          <span className="home-hero-promo-pulse" aria-hidden />
          New
        </span>
      </Link>

      <div className="home-hero-promo-body">
        <div className="home-hero-promo-info">
          <div className="home-hero-promo-meta">
            {flagshipGame.statusLabel} &middot; {flagshipGame.release}
          </div>
          <Link
            to={flagshipGame.href ?? '/games'}
            className="home-hero-promo-title"
          >
            {flagshipGame.title}
          </Link>
          <p className="home-hero-promo-desc">
            Talk to the guests of Safe Haven &mdash; a hotel located right next to a
            growing revolution.
          </p>
        </div>

        <div className="home-hero-promo-actions">
          <a
            href="https://store.steampowered.com"
            target="_blank"
            rel="noopener noreferrer"
            className="home-hero-promo-primary"
          >
            <img src={steamLogo} alt="" className="home-hero-promo-steam" />
            Add to Wishlist
          </a>
          <Link
            to={flagshipGame.href ?? '/games'}
            className="home-hero-promo-ghost"
          >
            More details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}

function SlateSection() {
  return (
    <section className="home-slate" id="games">
      <div className="studio-container">
        <motion.div
          className="home-section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div>
            <h2 className="home-section-title">Three worlds we are making.</h2>
          </div>
          <Link to="/games" className="home-section-link">
            Full slate <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="home-slate-grid">
          {slate.map((s, i) => (
            <motion.article
              key={s.id}
              className={`home-slate-card ${s.flagship ? 'home-slate-card-flagship' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: easeOut }}
            >
              <Link to={s.href} className="home-slate-link">
                <div className="home-slate-media">
                  {s.flagship ? (
                    <>
                      <img src={s.image} alt={s.title} className="home-slate-img" />
                      <div className="home-slate-scrim" aria-hidden />
                    </>
                  ) : (
                    <div className="home-slate-placeholder" aria-hidden>
                      <div className="home-slate-placeholder-blur" />
                      <span className="home-slate-placeholder-label">Coming Soon</span>
                    </div>
                  )}
                  <span className="home-slate-index" aria-hidden>{s.index}</span>
                </div>

                <div className="home-slate-body">
                  <div className="home-slate-meta">
                    <span className="home-slate-status">{s.status}</span>
                    <span aria-hidden>&middot;</span>
                    <span>{s.release}</span>
                  </div>
                  {s.flagship ? (
                    <>
                      <h3 className="home-slate-title">{s.title}</h3>
                      <div className="home-slate-genre">{s.genre}</div>
                    </>
                  ) : (
                    <h3 className="home-slate-title home-slate-title-concept">Project XXX</h3>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="home-manifesto">
      <div className="home-manifesto-bg" aria-hidden>
        <motion.div
          className="home-manifesto-orb"
          animate={{ x: ['-5%', '10%', '-5%'], y: ['0%', '-5%', '0%'] }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        />
        <div className="home-manifesto-lines" />
      </div>

      <div className="studio-container home-manifesto-content">
        <motion.h2
          className="home-manifesto-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.15, ease: easeOut }}
        >
          Games are the most powerful narrative medium
          <br />
          <span className="home-manifesto-em">in human history.</span>
          <br />
          Most of them refuse to act like it.
        </motion.h2>

        <div className="home-manifesto-pillars">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              className="home-manifesto-pillar"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease: easeOut }}
            >
              <div className="home-manifesto-pillar-num">{p.number}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="home-manifesto-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.75, ease: easeOut }}
        >
          <Link to="/about" className="home-btn-ghost">
            Read the manifesto <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TrailerSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="home-trailer">
      <div className="home-trailer-bg" aria-hidden>
        <motion.div
          className="home-trailer-glow"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="home-trailer-overlay" aria-hidden />

      <div className="studio-container home-trailer-container">
        <motion.h2
          className="home-trailer-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
        >
          Mind Your Stay &mdash; announcement reveal.
        </motion.h2>

        <motion.p
          className="home-trailer-desc"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
        >
          Atmospheric tension, intricate pixel art, and a haunting original score.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.45, ease: easeOut }}
        >
          <button type="button" onClick={onOpen} className="home-trailer-cta">
            <span className="home-trailer-play">
              <Play size={16} fill="currentColor" />
            </span>
            Watch the trailer
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function TrailerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="trailer-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Mind Your Stay trailer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
          onClick={onClose}
        >
          <motion.div
            className="trailer-modal-shell"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.45, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="trailer-modal-close"
              onClick={onClose}
              aria-label="Close trailer"
            >
              <X size={16} />
            </button>
            <video
              className="trailer-modal-video"
              controls
              autoPlay
              playsInline
              src={trailerVideo}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function StudioHome() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(true);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <div className="studio-page-wrapper">
      <StudioHeader />

      <HeroSection />

      <SlateSection />

      {/* ---------- Dispatches ---------- */}
      <section className="home-dispatches" id="newswire">
        <div className="studio-container">
          <motion.div
            className="home-section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <div>
              <h2 className="home-section-title">Dispatches from the studio.</h2>
            </div>
            <Link to="/news" className="home-section-link">
              All dispatches <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="home-dispatches-grid">
            {dispatchPreview.map((d, i) => (
              <motion.article
                key={d.id}
                className="home-dispatch-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: easeOut }}
              >
                <Link to={d.href} className="home-dispatch-link">
                  <div className="home-dispatch-media">
                    <img src={d.image} alt={d.title} />
                  </div>
                  <div className="home-dispatch-body">
                    <div className="home-dispatch-meta">
                      <span className="home-dispatch-cat">{d.category}</span>
                      <span aria-hidden>&middot;</span>
                      <span>{d.date}</span>
                    </div>
                    <h3 className="home-dispatch-title">{d.title}</h3>
                    <span className="home-dispatch-read">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ManifestoSection />

      <TrailerSection onOpen={() => setTrailerOpen(true)} />

      <TrailerModal open={trailerOpen} onClose={() => setTrailerOpen(false)} />

      <AnimatePresence>
        {promoOpen && <FloatingPromo onClose={() => setPromoOpen(false)} />}
      </AnimatePresence>

      {/* ---------- Dispatch signup ---------- */}
      <section className="home-signup" id="contact">
        <div className="studio-container">
          <motion.div
            className="home-signup-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: easeOut }}
          >
            <div className="home-signup-card-glow" aria-hidden />
            <div className="home-signup-container">
              <div>
                <h2 className="home-signup-title">
                  Quiet notes from the studio, in your inbox.
                </h2>
                <p className="home-signup-desc">
                  Devlogs, announcements, playtest invitations. No hype, no schedule.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="home-signup-form">
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="home-signup-input"
                  aria-label="Email address"
                />
                <button type="submit" className="home-signup-btn">
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
                {subscribed && (
                  <span className="home-signup-msg">
                    Thank you. We&rsquo;ll write soon.
                  </span>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
