import { motion } from 'framer-motion';
import dialogImg from '../assets/dialog_card.png';
import roomsImg from '../assets/rooms.png';
import bookImg from '../assets/rich_world_book.jpg';
import '../styles/World.css';

const cards = [
  {
    id: '01',
    category: 'Traversal',
    title: 'Choose Your Own Path',
    desc: 'Your decisions matter, so choose your own path through the story with branching dialogue options.',
    image: dialogImg
  },
  {
    id: '02',
    category: 'Simulation',
    title: 'Manage the Hotel',
    desc: 'Manage this hotel in the middle of a raging revolution. Allocate guests, earn money and upgrade rooms.',
    image: roomsImg
  },
  {
    id: '03',
    category: 'Narrative',
    title: 'Experience the Rich World',
    desc: 'Talk to your guests, learn their stories and experience this rich world full of drama, politics and war.',
    image: bookImg
  }
];

export default function World() {
  return (
    <section className="world-section-container" id="world">
      <div className="world-content">
        <div className="world-header">
          <motion.h2 
            className="world-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
          >
            What is the game <span className="highlight-orange">about</span>
          </motion.h2>
          
          <motion.p 
            className="world-paragraph"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            Talk to the guests of Safe Haven - a hotel located right next to a growing revolution.<br/>
            Choose your path through the story, manage the hotel, and experience a world full of history, politics and drama.
          </motion.p>
        </div>

        <div className="world-cards-grid">
          {cards.map((card, index) => (
            <motion.div 
              className="world-card" 
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="world-card-img-wrapper">
                <div className="world-card-badge">{card.category}</div>
                {card.image ? (
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="world-card-img" 
                  />
                ) : (
                  <div className="world-card-placeholder"></div>
                )}
              </div>
              <div className="world-card-content">
                <h3 className="world-card-title">{card.title}</h3>
                <p className="world-card-desc">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
