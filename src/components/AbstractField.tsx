import { motion } from 'framer-motion';

export default function AbstractField() {
  return (
    <div className="home-hero-field" aria-hidden>
      <motion.div
        className="home-hero-orb orb-1"
        animate={{ x: ['0%', '20%', '-10%', '0%'], y: ['0%', '-15%', '10%', '0%'] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="home-hero-orb orb-2"
        animate={{ x: ['0%', '-15%', '20%', '0%'], y: ['0%', '20%', '-10%', '0%'] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="home-hero-orb orb-3"
        animate={{ x: ['0%', '10%', '-15%', '0%'], y: ['0%', '-8%', '15%', '0%'] }}
        transition={{ duration: 68, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="home-hero-lines"
        animate={{ backgroundPositionY: ['0%', '100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <div className="home-hero-grain" />
    </div>
  );
}
