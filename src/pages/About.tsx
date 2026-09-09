import { motion } from 'framer-motion';
import StudioHeader from '../components/StudioHeader';
import Footer from '../components/Footer';
import AbstractField from '../components/AbstractField';
import '../styles/StudioHome.css';
import '../styles/About.css';

const easeOut = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    number: '01',
    title: 'Deep narrative',
    body: 'Nuanced dialogue, morally difficult decisions, stories without easy answers. We write for players who read the room.',
  },
  {
    number: '02',
    title: 'Handcrafted worlds',
    body: 'Every corridor, room, and document is authored. We prize dense environmental storytelling over procedurally generated breadth.',
  },
  {
    number: '03',
    title: 'Consequential agency',
    body: 'Choices leave marks. Dialogue, management, small hesitations — each generates a branch the world remembers.',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <StudioHeader />

      <div className="about-content-wrap">
        <div className="about-bg" aria-hidden>
          <AbstractField />
        </div>

        <main className="studio-container about-main">
          <motion.section
            className="about-hero"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            <h1 className="about-hero-statement">
              <span className="about-hero-line">We build worlds</span>
              <span className="about-hero-line about-hero-line-em">not to be completed,</span>
              <span className="about-hero-line">but to be felt, remembered,</span>
              <span className="about-hero-line">and debated long after</span>
              <span className="about-hero-line">the credits roll.</span>
            </h1>
          </motion.section>

          <motion.section
            className="about-narrative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: easeOut }}
          >
            <div className="about-narrative-label">The studio</div>
            <div className="about-narrative-body">
              <p>
                Massive Dreamers is an independent studio in Baku, Azerbaijan. We were founded
                on a shared conviction: video games are the most powerful narrative medium in
                human history, and most of them refuse to act like it.
              </p>
              <p>
                Instead of vast, shallow sandboxes, we build dense, meaningful, handcrafted
                worlds. Our debut project, <strong>Mind Your Stay</strong>, places the player
                in a pressure cooker of political turmoil, moral ambiguity, and deep character
                psychology &mdash; a hotel that watches back.
              </p>
              <p>
                We are small. That is not a limitation of ambition; it is the shape of the
                ambition.
              </p>
            </div>
          </motion.section>

          <section className="about-pillars">
            <motion.h2
              className="about-pillars-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: easeOut }}
            >
              What the studio is for.
            </motion.h2>

            <ol className="about-pillars-list">
              {pillars.map((p, i) => (
                <motion.li
                  key={p.number}
                  className="about-pillar"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: easeOut }}
                >
                  <div className="about-pillar-num">{p.number}</div>
                  <div className="about-pillar-content">
                    <h3 className="about-pillar-title">{p.title}</h3>
                    <p className="about-pillar-body">{p.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
