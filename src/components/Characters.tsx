import { motion } from 'framer-motion';
import '../styles/Characters.css';

const characters = [
  {
    id: '01',
    name: 'Sara Walker',
    role: 'Professional Companion',
    desc: 'Sara Walker is a “professional companion”. A lost soul, amidst the vast ocean of strangers.',
    image: '/Sprites/Characters/Laura_Walker.png'
  },
  {
    id: '02',
    name: 'Mark Brown',
    role: 'Previous Receptionist',
    desc: 'The previous receptionist of Safe Haven who has gone missing. Might his disappearance be related to a deeper narrative? Only time will tell.',
    image: '/Sprites/Characters/Mark_Brown.png'
  },
  {
    id: '03',
    name: 'Bob the Cheetah',
    role: 'Benefactor',
    desc: 'This guy knows people. And he seems to be quite the benefactor. But is there anything more to his facade…',
    image: '/Sprites/Characters/Bob_the_Cheetah.png'
  }
];

export default function Characters() {
  return (
    <section className="characters-section" id="characters">
      
      <div className="characters-header">
        <h2>The Cast of Safe Haven</h2>
      </div>

      <div className="characters-grid">
        {characters.map((char, index) => (
          <motion.div 
            className="character-card"
            key={char.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="character-card-img-wrapper">
              <div className="character-card-badge">{char.role}</div>
              <img src={char.image} alt={char.name} className="character-card-img" onError={(e) => (e.currentTarget.src = '/Sprites/Lobby/1 Buildings.PNG')} />
            </div>
            <div className="character-card-content">
              <h3 className="character-card-name">{char.name}</h3>
              <p className="character-card-desc">{char.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
}
