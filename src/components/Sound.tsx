import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../styles/Sound.css';

export default function Sound() {
  // Generate a static but random-looking waveform
  const waveformBars = Array.from({ length: 120 }).map((_, i) => {
    // Math to create a wave shape (higher in middle, lower on ends)
    const normalized = (i - 60) / 60; // -1 to 1
    // Wide curve so it grows from start to finish smoothly
    const bellCurve = Math.exp(-Math.pow(normalized, 2) * 3); // 0 to 1
    
    // Add some randomness
    const randomHeight = Math.random() * 0.4 + 0.6;
    const height = Math.max(2, bellCurve * randomHeight * 100);
    const isOrange = Math.random() > 0.8;
    
    // Randomize animation timing for continuous effect (slower)
    const duration = Math.random() * 1.0 + 0.6;
    const delay = Math.random() * -2; // Negative delay so they start immediately at different points

    return { height, isOrange, id: i, duration, delay };
  });

  return (
    <section className="sound-section" id="sound">
      <div className="sound-container">
        
        {/* Header */}
        <motion.div 
          className="sound-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="sound-title">Listen closely.</h2>
        </motion.div>

        {/* Waveform */}
        <div className="waveform-container">
          {waveformBars.map((bar, index) => (
            <motion.div
              key={bar.id}
              className={`wave-bar ${bar.isOrange ? 'wave-orange' : ''}`}
              style={{ 
                height: `${bar.height}%`,
                animationDuration: `${bar.duration}s`,
                animationDelay: `${bar.delay}s`
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.01,
                type: 'spring',
                stiffness: 100
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div 
          className="sound-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="sound-meta">
            Original Soundtrack<br/>
            <span className="sound-artist">by Ilse Rahn</span>
          </div>
          
          <button className="sound-btn">
            Listen to the Signal <ArrowRight size={14} className="ml-2" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
