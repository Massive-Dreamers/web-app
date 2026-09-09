import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <section className="notfound-page">
      <motion.div
        className="notfound-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="notfound-meta">Not found &nbsp;·&nbsp; Error 404</div>
        <h1 className="notfound-code">404</h1>
        <p className="notfound-copy">No record of this room in the ledger.</p>
        <Link to="/" className="notfound-link">
          <ArrowLeft size={14} /> Return to the lobby
        </Link>
      </motion.div>
    </section>
  );
}
