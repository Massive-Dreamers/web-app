import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Gamepad2, Globe, Mail, Newspaper } from 'lucide-react';
import BrandIcon from '../components/BrandIcon';
import SteamCard from '../components/SteamCard';
import studioLogo from '../assets/studio_ship_transparent.png';
import { socials } from '../data/socials';
import '../styles/Links.css';

const easeOut = [0.16, 1, 0.3, 1] as const;

const EMAIL = 'info@massivedreamers.com';

const sitePages = [
  { icon: Globe, label: 'Website', detail: 'massivedreamers.com', to: '/' },
  { icon: Gamepad2, label: 'All games', detail: 'The studio slate', to: '/games' },
  { icon: Newspaper, label: 'Newswire', detail: 'Notes from development', to: '/news' },
];

export default function Links() {
  return (
    <div className="links-page">
      <div className="links-cover" aria-hidden />

      <motion.main
        className="links-main"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <Link to="/" className="links-brand">
          <img src={studioLogo} alt="" className="links-brand-logo" />
          <span>Massive Dreamers</span>
        </Link>

        <section className="links-hero">
          <span className="links-hero-meta">Coming 2027 &nbsp;·&nbsp; PC</span>
          <h1 className="links-hero-title">Mind Your Stay</h1>
          <p className="links-hero-copy">
            A noir narrative RPG inside Hotel Safe Haven, during an escalating revolution.
          </p>
          <div className="links-hero-actions">
            <SteamCard />
            <Link to="/mind-your-stay" className="links-btn-ghost">
              About the game
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <nav className="links-group" aria-label="Follow">
          <h2 className="links-group-title">Follow the studio</h2>
          <ul>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="links-row"
                >
                  <span className="links-row-icon">
                    <BrandIcon name={social.icon} size={20} />
                  </span>
                  <span className="links-row-label">{social.label}</span>
                  <span className="links-row-detail">{social.handle}</span>
                  <ArrowUpRight size={18} className="links-row-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="links-group" aria-label="Studio">
          <h2 className="links-group-title">Studio</h2>
          <ul>
            {sitePages.map((page) => (
              <li key={page.to}>
                <Link to={page.to} className="links-row">
                  <span className="links-row-icon">
                    <page.icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="links-row-label">{page.label}</span>
                  <span className="links-row-detail">{page.detail}</span>
                  <ArrowRight size={18} className="links-row-arrow" />
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${EMAIL}`} className="links-row">
                <span className="links-row-icon">
                  <Mail size={20} strokeWidth={1.75} />
                </span>
                <span className="links-row-label">Email</span>
                <span className="links-row-detail">{EMAIL}</span>
                <ArrowUpRight size={18} className="links-row-arrow" />
              </a>
            </li>
          </ul>
        </nav>

        <footer className="links-footer">
          <span>An independent studio from Baku.</span>
          <span>© {new Date().getFullYear()} Massive Dreamers</span>
        </footer>
      </motion.main>
    </div>
  );
}
