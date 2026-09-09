import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ArrowDown } from 'lucide-react';
import roomsImg from '../assets/rooms.png';
import dialogCardImg from '../assets/dialog_card.png';
import buildingsImg from '../assets/buildings.png';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import '../styles/StudioHome.css';

const easeOut = [0.16, 1, 0.3, 1] as const;

const slate = [
  {
    id: 'mind-your-stay',
    index: 'I',
    title: 'Mind Your Stay',
    status: 'In development',
    release: '2027',
    genre: 'Narrative RPG',
    image: roomsImg,
    href: '/mind-your-stay',
    flagship: true,
  },
  {
    id: 'echo-horizon',
    index: 'II',
    title: 'Project Echo Horizon',
    status: 'Concept',
    release: 'TBA',
    genre: 'Sci-fi mystery',
    image: buildingsImg,
    href: '/games',
    flagship: false,
  },
  {
    id: 'chrono-archive',
    index: 'III',
    title: 'Project Chrono Archive',
    status: 'Concept',
    release: 'TBA',
    genre: 'Historical investigation',
    image: dialogCardImg,
    href: '/games',
    flagship: false,
  },
];

const dispatchPreview = [
  {
    id: 'reveal',
    title: 'Massive Dreamers reveals Mind Your Stay for PC',
    category: 'Announcement',
    date: 'August 2026',
    image: roomsImg,
    href: '/news',
  },
  {
    id: 'dialogue',
    title: 'The architecture of branching dialogue in Mind Your Stay',
    category: 'Devlog',
    date: 'September 2026',
    image: dialogCardImg,
    href: '/news',
  },
  {
    id: 'noir',
    title: 'Designing Safe Haven: pixel art, noir lighting, spatial mood',
    category: 'Design Diary',
    date: 'July 2026',
    image: buildingsImg,
    href: '/news',
  },
];

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

function AbstractField() {
  return (
    <div className="home-hero-field" aria-hidden>
      <motion.div
        className="home-hero-orb orb-1"
        animate={{ x: ['0%', '20%', '-10%', '0%'], y: ['0%', '-15%', '10%', '0%'] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="home-hero-orb orb-2"
        animate={{ x: ['0%', '-15%', '20%', '0%'], y: ['0%', '20%', '-10%', '0%'] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="home-hero-orb orb-3"
        animate={{ x: ['0%', '10%', '-15%', '0%'], y: ['0%', '-8%', '15%', '0%'] }}
        transition={{ duration: 68, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="home-hero-lines"
        animate={{ backgroundPositionY: ['0%', '100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <div className="home-hero-grain" />
    </div>
  );
}

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
          <motion.div
            className="home-hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: easeOut }}
          >
            <span className="home-hero-dot" aria-hidden />
            Independent studio &middot; Baku, Azerbaijan
          </motion.div>

          <motion.h1
            className="home-hero-title"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
            }}
          >
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
          </motion.h1>

          <motion.p
            className="home-hero-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.55, ease: easeOut }}
          >
            We build worlds you don&rsquo;t leave. Slow, deliberate,
            <br className="home-hero-desc-break" />
            narrative-first games from an independent studio.
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
            <div className="home-section-label">The Slate</div>
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
                  <img src={s.image} alt={s.title} className="home-slate-img" />
                  <div className="home-slate-scrim" aria-hidden />
                  <span className="home-slate-index" aria-hidden>{s.index}</span>
                </div>

                <div className="home-slate-body">
                  <div className="home-slate-meta">
                    <span className="home-slate-status">{s.status}</span>
                    <span aria-hidden>&middot;</span>
                    <span>{s.release}</span>
                  </div>
                  <h3 className="home-slate-title">{s.title}</h3>
                  <div className="home-slate-genre">{s.genre}</div>
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
        <motion.div
          className="home-section-label home-section-label-inline"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          Studio philosophy
        </motion.div>

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

function TrailerSection() {
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
        <motion.div
          className="home-section-label home-section-label-inline"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          Latest teaser
        </motion.div>

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
          <Link to="/mind-your-stay#trailer" className="home-trailer-cta">
            <span className="home-trailer-play">
              <Play size={16} fill="currentColor" />
            </span>
            Watch the trailer
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function StudioHome() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const [lead, ...secondaries] = dispatchPreview;

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
              <div className="home-section-label">Newswire</div>
              <h2 className="home-section-title">Dispatches from the studio.</h2>
            </div>
            <Link to="/news" className="home-section-link">
              All dispatches <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="home-dispatches-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: easeOut }}
            >
              <Link to={lead.href} className="home-dispatch-lead">
                <div className="home-dispatch-lead-media">
                  <img src={lead.image} alt={lead.title} />
                  <div className="home-dispatch-lead-scrim" aria-hidden />
                </div>
                <div className="home-dispatch-lead-body">
                  <div className="home-dispatch-meta">
                    <span className="home-dispatch-cat">{lead.category}</span>
                    <span aria-hidden>&middot;</span>
                    <span>{lead.date}</span>
                  </div>
                  <h3>{lead.title}</h3>
                  <span className="home-dispatch-read">
                    Read the dispatch <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>

            <ul className="home-dispatch-list">
              {secondaries.map((d, i) => (
                <motion.li
                  key={d.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: easeOut }}
                >
                  <Link to={d.href} className="home-dispatch-row">
                    <div className="home-dispatch-row-thumb">
                      <img src={d.image} alt="" />
                    </div>
                    <div className="home-dispatch-row-body">
                      <div className="home-dispatch-meta">
                        <span className="home-dispatch-cat">{d.category}</span>
                        <span aria-hidden>&middot;</span>
                        <span>{d.date}</span>
                      </div>
                      <h4>{d.title}</h4>
                    </div>
                    <ArrowRight size={16} className="home-dispatch-row-arrow" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ManifestoSection />

      <TrailerSection />

      {/* ---------- Dispatch signup ---------- */}
      <section className="home-signup" id="contact">
        <div className="studio-container home-signup-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <div className="home-section-label">Dispatch</div>
            <h2 className="home-signup-title">Quiet notes from the studio, in your inbox.</h2>
            <p className="home-signup-desc">
              Devlogs, announcements, playtest invitations. No hype, no schedule.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubscribe}
            className="home-signup-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
          >
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
              <span className="home-signup-msg">Thank you. We&rsquo;ll write soon.</span>
            )}
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
