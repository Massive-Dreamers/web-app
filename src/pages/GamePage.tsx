import Hero from '../components/Hero';
import Story from '../components/Story';
import World from '../components/World';
import Characters from '../components/Characters';
import Trailer from '../components/Trailer';
import Release from '../components/Release';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function GamePage() {
  return (
    <main>
      <Hero />
      <Story />
      <World />
      <Characters />
      <Trailer />
      <Release />
      <FinalCTA />
      <Footer />
    </main>
  );
}
