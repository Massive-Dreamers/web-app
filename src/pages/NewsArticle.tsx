import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import AbstractField from '../components/AbstractField';
import NotFound from '../components/NotFound';
import { dispatches, type DispatchBlock } from '../data/dispatches';
import { STEAM_URL } from '../data/games';
import '../styles/StudioHome.css';
import '../styles/News.css';

const easeOut = [0.16, 1, 0.3, 1] as const;

function Block({ block }: { block: DispatchBlock }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>;
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'list':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'button':
      return (
        <p>
          <Link to={block.to} className="article-inline-btn">
            {block.label} <ArrowRight size={15} />
          </Link>
        </p>
      );
    case 'image':
      return (
        <figure className="article-figure">
          <img src={block.src} alt={block.alt} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
  }
}

export default function NewsArticle() {
  const { id } = useParams();
  const article = dispatches.find((d) => d.id === id);

  if (!article) return <NotFound />;

  return (
    <div className="news-page">
      <StudioHeader />

      <div className="news-content-wrap">
        <div className="news-bg" aria-hidden>
          <AbstractField />
        </div>

        <motion.main
          className="studio-container article-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeOut }}
        >
          <Link to="/news" className="article-back">
            <ArrowLeft size={14} /> All dispatches
          </Link>

          <header className="article-header">
            <div className="news-card-meta">
              <span className="article-tag">{article.category}</span>
              <span>{article.date}</span>
              <span aria-hidden>&middot;</span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="article-title">{article.title}</h1>
          </header>

          <article className="article-body">
            {article.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {article.author && (
              <p className="article-signoff">
                Cheers,
                <br />
                {article.author}
              </p>
            )}
          </article>

          <a
            href={STEAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="article-cta"
          >
            Wishlist Mind Your Stay on Steam <ArrowUpRight size={16} />
          </a>
        </motion.main>
      </div>

      <Footer />
    </div>
  );
}
