import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import roomsImg from '../assets/rooms.png';
import steamLogo from '../assets/steamlogo.png';
import '../styles/Games.css';

type FilterType = 'all' | 'active' | 'concept';

type Status = 'active' | 'concept';

interface Project {
  slug: string;
  index: string;
  title: string;
  status: Status;
  statusLabel: string;
  release: string;
  genre: string;
  platform: string;
  description: string;
  href: string | null;
  cover: { kind: 'image'; src: string } | { kind: 'letter'; glyph: string; palette: string };
  flagship?: boolean;
}

const projects: Project[] = [
  {
    slug: 'mind-your-stay',
    index: 'I',
    title: 'Mind Your Stay',
    status: 'active',
    statusLabel: 'In development',
    release: '2027',
    genre: 'Narrative RPG / Point & click',
    platform: 'PC (Steam)',
    description:
      'A noir management adventure inside Hotel Safe Haven during an escalating revolution. Talk to guests, weigh moral tradeoffs, and see who you are when the corridors get quiet.',
    href: '/mind-your-stay',
    cover: { kind: 'image', src: roomsImg },
    flagship: true,
  },
  {
    slug: 'echo-horizon',
    index: 'II',
    title: 'Project Echo Horizon',
    status: 'concept',
    statusLabel: 'Concept & worldbuilding',
    release: 'TBA',
    genre: 'Sci-fi mystery',
    platform: 'PC',
    description:
      'A psychological thriller aboard an isolated deep-space listening station. Decode anomalous audio, unravel crew paranoia, decide what the signal was really saying.',
    href: null,
    cover: { kind: 'letter', glyph: 'E', palette: 'cool' },
  },
  {
    slug: 'chrono-archive',
    index: 'III',
    title: 'Project Chrono Archive',
    status: 'concept',
    statusLabel: 'Early creative design',
    release: 'TBA',
    genre: 'Historical investigation',
    platform: 'PC',
    description:
      'An investigative puzzle set inside a secret archive where the histories you file rearrange the physical present.',
    href: null,
    cover: { kind: 'letter', glyph: 'C', palette: 'warm' },
  },
];

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'In development' },
  { key: 'concept', label: 'Concepts' },
];

export default function Games() {
  const [filter, setFilter] = useState<FilterType>('all');

  const visible = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.status === filter);
  }, [filter]);

  return (
    <div className="games-page">
      <StudioHeader />

      <main className="studio-container games-main">
        <motion.header
          className="games-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="games-meta">Slate &mdash; {projects.length} productions</div>
          <h1 className="games-title">Games we are making.</h1>
          <p className="games-subtitle">
            Small, dense, handcrafted. One in development, two in concept, all built for players
            who remember the games they finish.
          </p>
        </motion.header>

        <motion.section
          className="games-marquee"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="games-marquee-image"
            style={{ backgroundImage: `url(${roomsImg})` }}
            aria-hidden
          />
          <div className="games-marquee-overlay" aria-hidden />

          <ol className="games-marquee-stack">
            {projects.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href={`#${p.slug}`} className="games-marquee-row">
                  <span className="games-marquee-title">{p.title}</span>
                  <span className="games-marquee-tag">
                    {p.status === 'active' ? p.release : 'Concept'}
                  </span>
                </a>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        <nav className="games-filters" aria-label="Filter productions">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`games-filter-link ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </nav>

        <ul className="games-index">
          {visible.map((p, i) => (
            <motion.li
              key={p.slug}
              id={p.slug}
              className={`games-row ${p.flagship ? 'games-row-flagship' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`games-row-cover cover-${p.cover.kind}`}>
                {p.cover.kind === 'image' ? (
                  <img src={p.cover.src} alt={p.title} className="games-row-img" />
                ) : (
                  <div className={`games-row-letter palette-${p.cover.palette}`} aria-hidden>
                    <span className="games-row-letter-index">{p.index}</span>
                    <span className="games-row-letter-glyph">{p.cover.glyph}</span>
                    <span className="games-row-letter-caption">Cover in production</span>
                  </div>
                )}
              </div>

              <div className="games-row-body">
                <div className="games-row-meta-row">
                  <span className="games-row-index">{p.index}</span>
                  <span className="games-row-dot" aria-hidden>&middot;</span>
                  <span className="games-row-status">{p.statusLabel}</span>
                </div>

                <h2 className="games-row-title">{p.title}</h2>

                <dl className="games-row-attrs">
                  <div className="games-row-attr">
                    <dt>Genre</dt>
                    <dd>{p.genre}</dd>
                  </div>
                  <div className="games-row-attr">
                    <dt>Platform</dt>
                    <dd>{p.platform}</dd>
                  </div>
                  <div className="games-row-attr">
                    <dt>Release</dt>
                    <dd>{p.release}</dd>
                  </div>
                </dl>

                <p className="games-row-desc">{p.description}</p>

                {p.flagship ? (
                  <div className="games-row-actions">
                    <a
                      href="https://store.steampowered.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="games-cta-primary"
                    >
                      <img src={steamLogo} alt="" className="games-steam-icon" />
                      Wishlist on Steam
                    </a>
                    {p.href && (
                      <Link to={p.href} className="games-cta-ghost">
                        Enter the hotel <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="games-row-actions">
                    <span className="games-cta-passive">
                      More soon <ArrowUpRight size={14} />
                    </span>
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
