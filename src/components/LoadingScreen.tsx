import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import studioLogo from '../assets/studio_ship_transparent.png';
import '../styles/LoadingScreen.css';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isGliding, setIsGliding] = useState(false);
  const [targetTransform, setTargetTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isVisible, setIsVisible] = useState(true);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('intro-anim-active');
    const startTime = performance.now();
    const duration = 3000; // Exact 3 seconds to fill completely

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      
      // Smooth natural easeInOut curve
      const easedProgress = rawProgress < 0.5 
        ? 2 * rawProgress * rawProgress 
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      setProgress(Math.round(easedProgress * 100));

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Find header logo position in the DOM
        const targetEl = document.querySelector('.studio-header-logo-img') as HTMLElement | null;
        const sourceEl = logoRef.current;

        if (targetEl && sourceEl) {
          const targetRect = targetEl.getBoundingClientRect();
          const sourceRect = sourceEl.getBoundingClientRect();

          const targetX = targetRect.left + targetRect.width / 2;
          const targetY = targetRect.top + targetRect.height / 2;
          const sourceX = sourceRect.left + sourceRect.width / 2;
          const sourceY = sourceRect.top + sourceRect.height / 2;

          setTargetTransform({
            x: targetX - sourceX,
            y: targetY - sourceY,
            scale: targetRect.height / sourceRect.height,
          });
        } else {
          // Fallback approximate position for top navbar logo
          setTargetTransform({
            x: -(window.innerWidth / 2 - Math.max(32, (window.innerWidth - 1200) / 2 + 30)),
            y: -(window.innerHeight / 2 - 34),
            scale: 30 / 160,
          });
        }

        setIsGliding(true);

        // After glide transition finishes, reveal real header logo and unmount
        setTimeout(() => {
          document.body.classList.remove('intro-anim-active');
          setIsVisible(false);
          setTimeout(onComplete, 50);
        }, 850);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('intro-anim-active');
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`studio-intro-overlay ${isGliding ? 'gliding' : ''}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="intro-center-content">
            {/* Minimalist Logo Filling Animation */}
            <motion.div 
              ref={logoRef}
              className="intro-logo-stage"
              animate={isGliding ? {
                x: targetTransform.x,
                y: targetTransform.y,
                scale: targetTransform.scale,
              } : {
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Ghost outline */}
              <img 
                src={studioLogo} 
                alt="Massive Dreamers" 
                className="intro-logo-ghost" 
              />

              {/* Liquid rising fill */}
              <div 
                className="intro-logo-fill-mask"
                style={{
                  maskImage: `url(${studioLogo})`,
                  WebkitMaskImage: `url(${studioLogo})`,
                }}
              >
                <div 
                  className="intro-logo-fill-level"
                  style={{ height: `${progress}%` }}
                >
                  <div className="intro-liquid-wave"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
