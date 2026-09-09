import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import roomsImg from '../assets/rooms.png';
import dialogCardImg from '../assets/dialog_card.png';
import buildingsImg from '../assets/buildings.png';
import lobbyImg from '../assets/lobby.png';
import '../styles/News.css';

type NewsCategory = 'all' | 'devlog' | 'announcement' | 'design';

interface Article {
  id: string;
  title: string;
  category: 'Devlog' | 'Announcement' | 'Design Diary';
  categoryKey: NewsCategory;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

const filters: { key: NewsCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'announcement', label: 'Announcements' },
  { key: 'devlog', label: 'Devlogs' },
  { key: 'design', label: 'Design Diaries' },
];

const articles: Article[] = [
  {
    id: '1',
    title: 'Massive Dreamers reveals Mind Your Stay for PC',
    category: 'Announcement',
    categoryKey: 'announcement',
    date: 'August 2026',
    readTime: '3 min',
    excerpt: 'Our debut narrative RPG and point-and-click adventure, set inside a hotel caught between espionage, history, and a mounting civil revolution.',
    image: roomsImg,
    featured: true,
  },
  {
    id: '2',
    title: 'The architecture of branching dialogue in Mind Your Stay',
    category: 'Devlog',
    categoryKey: 'devlog',
    date: 'September 2026',
    readTime: '4 min',
    excerpt: 'How we built dialogue trees that remember every choice, hesitate under pressure, and reflect the player’s moral alignment across the Safe Haven crisis.',
    image: dialogCardImg,
  },
  {
    id: '3',
    title: 'Designing Safe Haven: pixel art, noir lighting, spatial mood',
    category: 'Design Diary',
    categoryKey: 'design',
    date: 'July 2026',
    readTime: '5 min',
    excerpt: 'A close read of the artistic process behind 2D environments that feel tangible, historically grounded, and layered with environmental storytelling.',
    image: buildingsImg,
  },
  {
    id: '4',
    title: 'Scoring tension: the philosophy of dynamic audio and silence',
    category: 'Devlog',
    categoryKey: 'devlog',
    date: 'June 2026',
    readTime: '4 min',
    excerpt: 'Why silence and acoustic weight matter as much as melody when building suspense across long corridors and clandestine guest interviews.',
    image: lobbyImg,
  },
];

export default function News() {
  const [filter, setFilter] = useState<NewsCategory>('all');

  const filteredArticles =
    filter === 'all' ? articles : articles.filter((a) => a.categoryKey === filter);

  const featuredArticle = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="news-page">
      <StudioHeader />

      <main className="studio-container news-main">
        <motion.header
          className="news-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="news-header-lead">
            <div className="news-meta">Newswire</div>
            <h1 className="news-title">Dispatches from the studio.</h1>
            <p className="news-subtitle">
              Development writing, announcements, and design diaries from Massive Dreamers.
            </p>
          </div>
          <a href="mailto:press@massivedreamers.com" className="news-press-pill">
            press@massivedreamers.com
          </a>
        </motion.header>

        <nav className="news-filters" aria-label="Filter dispatches">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`news-filter-link ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </nav>

        {featuredArticle && (
          <motion.article
            className="news-featured"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="news-featured-media">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="news-featured-img"
              />
            </div>

            <div className="news-featured-body">
              <div className="news-featured-meta">
                <span className="news-featured-category">{featuredArticle.category}</span>
                <span className="news-featured-dot" aria-hidden>&middot;</span>
                <span className="news-featured-date">{featuredArticle.date}</span>
                <span className="news-featured-dot" aria-hidden>&middot;</span>
                <span className="news-featured-read">{featuredArticle.readTime}</span>
              </div>

              <h2 className="news-featured-title">{featuredArticle.title}</h2>
              <p className="news-featured-excerpt">{featuredArticle.excerpt}</p>

              <span className="news-read-more">
                Read the dispatch <ArrowRight size={14} />
              </span>
            </div>
          </motion.article>
        )}

        <div className="news-more-heading">More from the newswire</div>

        <ul className="news-list">
          {gridArticles.map((article, index) => (
            <motion.li
              key={article.id}
              className="news-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="news-row-media">
                <img src={article.image} alt={article.title} className="news-row-img" />
              </div>

              <div className="news-row-body">
                <div className="news-row-meta">
                  <span className="news-row-category">{article.category}</span>
                  <span className="news-featured-dot" aria-hidden>&middot;</span>
                  <span>{article.date}</span>
                  <span className="news-featured-dot" aria-hidden>&middot;</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="news-row-title">{article.title}</h3>
                <p className="news-row-excerpt">{article.excerpt}</p>
                <span className="news-row-cta">
                  Read <ArrowRight size={12} />
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
