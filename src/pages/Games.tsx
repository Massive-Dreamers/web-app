import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import AbstractField from '../components/AbstractField';
import { games } from '../data/games';
import '../styles/StudioHome.css';
import '../styles/Games.css';

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Games() {
  return (
    <div className="games-page">
      <StudioHeader />

      <div className="games-content-wrap">
        <div className="games-bg" aria-hidden>
          <AbstractField />
        </div>

        <main className="studio-container games-main">
        <motion.header
          className="games-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <h1 className="games-title">Games we are making.</h1>
          <p className="games-subtitle">
            Small, dense, handcrafted. One in development, two in planning, all built for
            players who remember the games they finish.
          </p>
        </motion.header>

        <div className="games-grid">
          {games.map((g, i) => {
            const isFlagship = g.flagship;
            const CardRoot = isFlagship && g.href ? Link : 'div';
            const cardProps = isFlagship && g.href ? { to: g.href } : {};

            return (
              <motion.article
                key={g.slug}
                className={`games-card ${isFlagship ? 'games-card-active' : 'games-card-concept'}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: easeOut }}
              >
                {/* @ts-expect-error dynamic element */}
                <CardRoot className="games-card-inner" {...cardProps}>
                  <div className="games-card-media">
                    {isFlagship ? (
                      <img src={g.image} alt={g.title} className="games-card-img" />
                    ) : (
                      <div className="games-card-placeholder" aria-hidden>
                        <div className="games-card-placeholder-blur" />
                      </div>
                    )}
                    <div className="games-card-scrim" aria-hidden />

                    <div className="games-card-overlay">
                      <div className="games-card-meta">
                        <span className="games-card-status">{g.statusLabel}</span>
                        <span aria-hidden>&middot;</span>
                        <span>{g.release}</span>
                      </div>
                      <h2 className="games-card-title">
                        {isFlagship ? g.title : 'Coming Soon'}
                      </h2>
                      {isFlagship ? (
                        <p className="games-card-desc">{g.description}</p>
                      ) : (
                        <p className="games-card-desc games-card-desc-muted">
                          Project XXX &middot; details under wraps
                        </p>
                      )}
                      <div className="games-card-cta">
                        {isFlagship ? (
                          <>
                            Explore Mind Your Stay <ArrowUpRight size={16} />
                          </>
                        ) : (
                          <>Announcement pending</>
                        )}
                      </div>
                    </div>

                    <span className="games-card-index" aria-hidden>{g.index}</span>
                  </div>
                </CardRoot>
              </motion.article>
            );
          })}
        </div>
      </main>
      </div>

      <Footer />
    </div>
  );
}
