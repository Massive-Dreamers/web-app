import { motion } from 'framer-motion';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import '../styles/About.css';

const pillars = [
  {
    number: '01',
    title: 'Deep Narrative',
    body: 'Nuanced dialogue, morally difficult decisions, stories without easy answers. We write for players who read the room.',
  },
  {
    number: '02',
    title: 'Handcrafted Worlds',
    body: 'Every corridor, room, and document is authored. We prize dense environmental storytelling over procedurally generated breadth.',
  },
  {
    number: '03',
    title: 'Consequential Agency',
    body: 'Choices leave marks. Dialogue, management, small hesitations — each generates a branch the world remembers.',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <StudioHeader />

      <main className="studio-container about-main">
        <motion.header
          className="about-lede"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-meta">Massive Dreamers &nbsp;·&nbsp; Baku, Azerbaijan &nbsp;·&nbsp; Est. 2024</div>
          <h1 className="about-title">Crafting worlds that stay with you.</h1>
          <p className="about-lede-body">
            An independent studio building narrative-first games. We work slowly and deliberately,
            because the games we want to make aren&rsquo;t the games you finish and forget.
          </p>
        </motion.header>

        <motion.section
          className="about-story"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-story-label">Studio</div>
          <div className="about-story-body">
            <p>
              Massive Dreamers was founded on a shared conviction: video games are the most
              powerful narrative medium in human history, and most of them refuse to act like it.
            </p>
            <p>
              Instead of vast, shallow sandboxes, we build dense, meaningful, handcrafted worlds.
              Our debut project, <strong>Mind Your Stay</strong>, places the player in a pressure
              cooker of political turmoil, moral ambiguity, and deep character psychology &mdash; a
              hotel that watches back.
            </p>
            <p>
              We are small. That is not a limitation of ambition; it is the shape of the ambition.
            </p>
          </div>
        </motion.section>

        <motion.blockquote
          className="about-pull"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9 }}
        >
          <p>
            We build worlds not to be completed, but to be felt, remembered, and debated long after
            the credits roll.
          </p>
          <footer>&mdash; Studio manifesto</footer>
        </motion.blockquote>

        <section className="about-pillars">
          <div className="about-pillars-heading">
            <div className="about-section-label">Pillars</div>
            <h2>What the studio is for.</h2>
          </div>

          <ol className="about-pillars-list">
            {pillars.map((p, i) => (
              <motion.li
                key={p.number}
                className="about-pillar-row"
                style={{ ['--pillar-indent' as string]: `${i * 2.5}rem` }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="about-pillar-index">
                  <span className="about-pillar-num">{p.number}</span>
                  <h3 className="about-pillar-title">{p.title}</h3>
                </div>
                <p className="about-pillar-body">{p.body}</p>
              </motion.li>
            ))}
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
}
