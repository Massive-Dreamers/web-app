import { motion } from 'framer-motion';
import '../styles/Story.css';

export default function Story() {
  return (
    <section className="story-section" id="story">
      <div className="story-content">
        <motion.h2 
          className="story-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Can revenge<br/>
          wait for <span className="highlight-orange">five hundred</span><br/>
          years?
        </motion.h2>
        
        <motion.p 
          className="story-paragraph"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          In this game, you will witness a revolution by locals aiming to drive conquerors out of their land. But why did they wait five hundred years to start the revolution? Did they plan this through generations, or was it merely a reaction to the growing violence by the conquerors?
          <br/><br/>
          Take part in the story, listen to both sides, and try to uncover the truth behind all of this.
        </motion.p>
        
      </div>

      <motion.div 
        className="story-image-container"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <div className="story-image"></div>
      </motion.div>
    </section>
  );
}
