import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import AbstractField from '../components/AbstractField';
import { dispatches, type NewsCategory as DispatchCategory } from '../data/dispatches';
import '../styles/StudioHome.css';
import '../styles/News.css';

const easeOut = [0.16, 1, 0.3, 1] as const;

type NewsFilter = 'all' | DispatchCategory;

const filters: { key: NewsFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'announcement', label: 'Announcements' },
  { key: 'devlog', label: 'Devlogs' },
  { key: 'design', label: 'Design Diaries' },
];

export default function News() {
  const [filter, setFilter] = useState<NewsFilter>('all');

  const visible = useMemo(() => {
    if (filter === 'all') return dispatches;
    return dispatches.filter((d) => d.categoryKey === filter);
  }, [filter]);

  return (
    <div className="news-page">
      <StudioHeader />

      <div className="news-content-wrap">
        <div className="news-bg" aria-hidden>
          <AbstractField />
        </div>

        <main className="studio-container news-main">
          <motion.header
            className="news-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: easeOut }}
          >
            <h1 className="news-title">Dispatches from the studio.</h1>
            <p className="news-subtitle">
              Development writing, announcements, and design diaries from Massive Dreamers.
            </p>
          </motion.header>

          <motion.nav
            className="news-filters"
            aria-label="Filter dispatches"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          >
            {filters.map((f) => (
              <button
                key={f.key}
                className={`news-filter-link ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </motion.nav>

          <div className="news-grid">
            {visible.map((article, i) => (
              <motion.article
                key={article.id}
                className="news-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.25 + i * 0.08,
                  ease: easeOut,
                }}
              >
                <a href="#" className="news-card-inner" onClick={(e) => e.preventDefault()}>
                  <div className="news-card-media">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="news-card-img"
                    />
                    <div className="news-card-scrim" aria-hidden />
                    <span className="news-card-tag">{article.category}</span>
                  </div>

                  <div className="news-card-body">
                    <div className="news-card-meta">
                      <span>{article.date}</span>
                      <span aria-hidden>&middot;</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="news-card-title">{article.title}</h2>

                    <p className="news-card-excerpt">{article.excerpt}</p>

                    <span className="news-card-cta">
                      Read <ArrowUpRight size={14} />
                    </span>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
