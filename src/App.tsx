import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import StudioHome from './pages/StudioHome';
import Games from './pages/Games';
import About from './pages/About';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';
import Contact from './pages/Contact';
import Links from './pages/Links';
import GamePage from './pages/GamePage';
import NotFound from './components/NotFound';
import LoadingScreen from './components/LoadingScreen';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  // /links is the printed QR target: people arrive on a phone wanting a link,
  // so it skips the studio intro.
  const [isLoading, setIsLoading] = useState(
    () => !/^\/links\/?$/.test(window.location.pathname),
  );

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <BrowserRouter>
        <div className="noise-overlay"></div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<StudioHome />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mind-your-stay" element={<GamePage />} />
          <Route path="/links" element={<Links />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
