import { useEffect, useRef } from 'react';

interface Particle {
  baseXRatio: number;
  baseYOffset: number;
  size: number;
  baseAlpha: number;
  floatPhase: number;
}

export default function HeroCrescentWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let isVisible = true;

    // Smooth cursor tracking with easing
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let isMouseActive = false;

    const initParticles = () => {
      if (width <= 0 || height <= 0) return;
      particles = [];
      // High visual density with 60FPS high performance
      const numColumns = Math.max(12, Math.floor(width / 11.5));
      const rowsPerColumn = 20;

      for (let col = 0; col < numColumns; col++) {
        const xRatio = (col / Math.max(1, numColumns - 1)) * 2 - 1; // -1 to 1

        for (let row = 0; row < rowsPerColumn; row++) {
          const spreadFactor = (Math.random() - 0.5) * 2;
          const spread = Math.sign(spreadFactor) * Math.pow(Math.abs(spreadFactor), 1.6) * 120;

          const distFromCenter = Math.abs(spread) / 120;
          const baseAlpha = Math.max(0.06, Math.pow(Math.max(0, 1 - distFromCenter), 2.0) * 0.88);
          const size = Math.random() < 0.2 ? (Math.random() * 1.5 + 1.2) : (Math.random() * 0.8 + 0.65);

          particles.push({
            baseXRatio: xRatio,
            baseYOffset: spread,
            size,
            baseAlpha,
            floatPhase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 600;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    handleResize();

    const handlePointerMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left - 50 &&
        e.clientX <= rect.right + 50 &&
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50
      ) {
        targetMouseX = e.clientX - rect.left;
        targetMouseY = e.clientY - rect.top;
        isMouseActive = true;
      } else {
        targetMouseX = -1000;
        targetMouseY = -1000;
        isMouseActive = false;
      }
    };

    const handlePointerLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
      isMouseActive = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', handleResize);

    // Pause rendering when canvas is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (isVisible && width > 0 && height > 0 && particles.length > 0) {
        // Reduced wave speed for calm, steady progression
        time += 0.0085;

        // Smooth cursor easing
        if (isMouseActive) {
          mouseX += (targetMouseX - mouseX) * 0.1;
          mouseY += (targetMouseY - mouseY) * 0.1;
        } else {
          mouseX += (-1000 - mouseX) * 0.1;
          mouseY += (-1000 - mouseY) * 0.1;
        }

        ctx.clearRect(0, 0, width, height);

        const cy = height * 0.89;
        const curveDepth = height * 0.76;
        const maxInteractionRadius = 170;
        const maxRadiusSq = maxInteractionRadius * maxInteractionRadius;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const normalizedX = (p.baseXRatio + 1) * 0.5; // 0 to 1
          let x = normalizedX * width;

          // Parabolic crescent curve - center drops gracefully below hero text
          const curveX = p.baseXRatio;
          const parabola = curveX * curveX;
          const curveY = cy - curveDepth * (parabola - 0.02);

          // Left-to-Right wave motion (calm, graceful speed)
          const mainWave = Math.sin(time * 0.95 - normalizedX * 7.2) * 14;
          const subWave = Math.cos(time * 0.55 - normalizedX * 12.0) * 5.5;
          const subtleFloat = Math.sin(time * 0.35 + p.floatPhase) * 1.5;

          let y = curveY + p.baseYOffset + mainWave + subWave + subtleFloat;
          let particleSize = p.size;
          let currentAlpha = p.baseAlpha;

          // Subtle, smooth cursor proximity interaction
          if (isMouseActive) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxRadiusSq && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const q = 1 - dist / maxInteractionRadius;
              const smoothQ = q * q * (3 - 2 * q); // Smoothstep
              const force = smoothQ * 28;

              const angle = Math.atan2(dy, dx);
              x += Math.cos(angle) * force;
              y += Math.sin(angle) * force;

              // Minimal subtle size change (only ~20% enlargement)
              particleSize = p.size * (1 + smoothQ * 0.2);
              currentAlpha = Math.min(0.95, p.baseAlpha + smoothQ * 0.25);

              if (smoothQ > 0.55) {
                const haloAlpha = (smoothQ - 0.55) * 0.18;
                ctx.fillStyle = `rgba(255, 255, 255, ${haloAlpha})`;
                ctx.beginPath();
                ctx.arc(x, y, particleSize * 1.4, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }

          // Draw particle
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(x, y, particleSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="hero-crescent-canvas"
      aria-hidden="true"
    />
  );
}
