import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Maximize2, Minimize, Volume2, VolumeX } from 'lucide-react';
import trailerVideo from '../assets/trailer.mp4';
import lobbyImg from '../assets/lobby.png';
import '../styles/Trailer.css';

// Fiery ragged splatter/starburst play icon matching the reference artwork
function SplatPlayIcon({ className = '', size = 72 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M50 2
           C52.5 5.8 53.1 7.2 56 4.5
           C58.2 8.1 60.5 7.8 62.5 11
           C65.5 10 66.8 12.8 70 12.5
           C71.8 15.8 74.2 15.2 76 18.8
           C79.2 18.2 80.5 21.5 83.5 22
           C84.8 25.8 87.5 26.2 88.5 30.2
           C91.2 31.8 91.5 35 93.8 37
           C93.8 41 96.5 42.5 96 46.8
           C97.8 49.5 96.8 53 97.5 56
           C95.2 59.2 96.2 62.5 93.5 65.5
           C93.2 69 90.8 71.2 89.5 74.8
           C86.8 76.5 86.2 79.8 83 81.8
           C81.8 85.2 78.5 86.8 76 89.8
           C72.8 90.5 71.2 93.5 67.5 94
           C64.8 96.8 61.8 95.8 58.5 98
           C55.5 96.5 53.8 98.8 50 97.5
           C46.5 98.8 44.8 96.2 41.5 98
           C38.2 95.5 35.5 96.8 32.5 94
           C28.8 93.5 27.2 90.5 24 89.8
           C21.5 86.5 18.2 85.2 17 81.8
           C13.8 79.5 13.2 76.2 10.5 74.5
           C9.2 71 6.8 68.8 6.5 65.2
           C3.8 62.2 4.8 59 2.5 55.8
           C3.2 52.8 2.2 49.2 4 46.5
           C3.5 42.2 6.2 40.8 6.2 36.8
           C8.5 34.8 8.8 31.5 11.5 29.8
           C12.5 26 15.2 25.5 16.5 21.8
           C19.5 21.2 20.8 18 24 18.5
           C25.8 15 28.2 15.5 30 12.2
           C33.2 12.5 34.5 9.8 37.5 10.8
           C39.5 7.5 41.8 7.8 44 4.2
           C46.8 7 47.5 5.5 50 2 Z" 
        fill="#e05a2b"
      />
      {/* Dynamic splatter micro-dots */}
      <circle cx="91" cy="27" r="1.8" fill="#e05a2b" />
      <circle cx="8" cy="32" r="1.5" fill="#e05a2b" />
      <circle cx="94" cy="71" r="1.6" fill="#e05a2b" />
      <circle cx="12" cy="78" r="1.4" fill="#e05a2b" />
      <circle cx="48" cy="2" r="1.2" fill="#e05a2b" />
      <circle cx="53" cy="99" r="1.4" fill="#e05a2b" />
      <circle cx="82" cy="88" r="1.3" fill="#e05a2b" />
      <circle cx="18" cy="14" r="1.5" fill="#e05a2b" />
      <circle cx="88" cy="50" r="1.2" fill="#e05a2b" />
      <circle cx="11" cy="52" r="1.2" fill="#e05a2b" />

      {/* Crisp White Play Icon */}
      <polygon points="44,38 44,62 66,50" fill="#ffffff" />
    </svg>
  );
}

// Stylized ink/brush frame border overlay
function BrushBorderOverlay() {
  return (
    <svg 
      className="trailer-brush-frame" 
      viewBox="0 0 1000 562" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="brush-distort" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.8" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Rough outer frame matte */}
      <rect
        x="6"
        y="6"
        width="988"
        height="550"
        stroke="#0f0a08"
        strokeWidth="16"
        fill="none"
        filter="url(#brush-distort)"
      />
      
      {/* Inner fine distressed border */}
      <rect
        x="12"
        y="12"
        width="976"
        height="538"
        stroke="rgba(255, 255, 255, 0.12)"
        strokeWidth="1.5"
        fill="none"
        filter="url(#brush-distort)"
      />
    </svg>
  );
}

export default function Trailer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCenterIcon, setShowCenterIcon] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const iconTimeoutRef = useRef<number | null>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Intersection Observer for mini-player scroll detection
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          setIsMinimized(true);
        } else {
          setIsMinimized(false);
        }
      },
      { threshold: [0, 0.2, 0.5, 1.0] }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const triggerCenterFeedback = () => {
    setShowCenterIcon(true);
    if (iconTimeoutRef.current) clearTimeout(iconTimeoutRef.current);
    iconTimeoutRef.current = window.setTimeout(() => {
      setShowCenterIcon(false);
    }, 600);
  };

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setIsDismissed(false);
    }
    triggerCenterFeedback();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || !videoRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    videoRef.current.currentTime = clampedPos * duration;
    setCurrentTime(clampedPos * duration);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const elem = sectionRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  const handleDismissMini = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleExpandToSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const showFloatingPlayer = isPlaying && isMinimized && !isDismissed;

  return (
    <>
      <section 
        className="trailer-section" 
        id="trailer" 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
      >
        {/* Ambient background atmosphere */}
        <div className="trailer-ambient-glow"></div>

        <div className="trailer-outer-container">
          {/* Framed Video Container */}
          <motion.div 
            className="trailer-frame-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div 
              className="trailer-video-card"
              onClick={isPlaying ? () => handleTogglePlay() : undefined}
            >
              {/* Video Element */}
              <video 
                ref={videoRef}
                src={trailerVideo} 
                poster={lobbyImg}
                loop 
                playsInline 
                className={`trailer-video-element ${showFloatingPlayer ? 'hidden-in-section' : ''}`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />

              {/* Edge Vignette & Ambient Layer */}
              <div className="trailer-vignette-overlay"></div>

              {/* Brush Border Frame Edge */}
              <BrushBorderOverlay />

              {/* Center Splat Play Button (When Paused / Initial) */}
              {!isPlaying && (
                <div className="trailer-splat-center-wrap">
                  <motion.button 
                    className="splat-play-btn"
                    onClick={handleTogglePlay}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label="Play Trailer"
                  >
                    <SplatPlayIcon size={92} />
                  </motion.button>
                </div>
              )}

              {/* Pause / Play Feedback Flash on Video */}
              <AnimatePresence>
                {isPlaying && showCenterIcon && !showFloatingPlayer && (
                  <motion.div 
                    className="center-feedback-icon"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isPlaying ? <Play size={44} fill="currentColor" /> : <Pause size={44} fill="currentColor" />}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* YouTube-Style Controls Bar at Bottom */}
              {isPlaying && !showFloatingPlayer && (
                <div 
                  className={`yt-controls-container ${showControls || !isPlaying ? 'visible' : 'hidden'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Progress / Seek Timeline Bar */}
                  <div 
                    className="yt-progress-bar-container"
                    ref={progressBarRef}
                    onClick={handleSeek}
                  >
                    <div className="yt-progress-track">
                      <div 
                        className="yt-progress-filled" 
                        style={{ width: `${progressPercent}%` }}
                      >
                        <div className="yt-progress-scrubber"></div>
                      </div>
                    </div>
                  </div>

                  {/* Control Buttons Row */}
                  <div className="yt-controls-row">
                    {/* Left Controls: Play/Pause, Volume, Time */}
                    <div className="yt-controls-left">
                      <button 
                        className="yt-ctrl-btn" 
                        onClick={handleTogglePlay}
                        title={isPlaying ? "Pause (k)" : "Play (k)"}
                      >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                      </button>

                      <div className="yt-volume-group">
                        <button className="yt-ctrl-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="yt-volume-slider"
                        />
                      </div>

                      <div className="yt-time-display">
                        <span>{formatTime(currentTime)}</span>
                        <span className="yt-time-sep">/</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Right Controls: Fullscreen */}
                    <div className="yt-controls-right">
                      <button 
                        className="yt-ctrl-btn" 
                        onClick={toggleFullscreen}
                        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                      >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize2 size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Mini-Player (When Scrolled Out) */}
      <AnimatePresence>
        {showFloatingPlayer && (
          <motion.div 
            className="trailer-mini-player"
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.85 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={handleTogglePlay}
          >
            {/* Top Toolbar */}
            <div className="mini-player-header" onClick={(e) => e.stopPropagation()}>
              <span className="mini-player-title">MIND YOUR STAY — OFFICIAL TRAILER</span>
              <div className="mini-player-actions">
                <button 
                  className="mini-btn" 
                  title="Expand to Full View"
                  onClick={handleExpandToSection}
                >
                  <Maximize2 size={14} />
                </button>
                <button 
                  className="mini-btn mini-btn-close" 
                  title="Close"
                  onClick={handleDismissMini}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Video Canvas Mirror / Container */}
            <div className="mini-player-video-wrap">
              <video 
                src={trailerVideo} 
                autoPlay
                loop
                playsInline
                muted={isMuted}
                ref={(el) => {
                  if (el && videoRef.current) {
                    if (Math.abs(el.currentTime - videoRef.current.currentTime) > 0.5) {
                      el.currentTime = videoRef.current.currentTime;
                    }
                    if (isPlaying && el.paused) el.play();
                    else if (!isPlaying && !el.paused) el.pause();
                  }
                }}
                className="mini-video"
              />
              
              {/* Play / Pause overlay on hover */}
              <div className="mini-player-hover-overlay">
                <div className="mini-play-icon">
                  {isPlaying ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
                </div>
              </div>
            </div>

            {/* Mini Player Bottom Bar */}
            <div className="mini-player-footer" onClick={(e) => e.stopPropagation()}>
              <button className="mini-footer-btn" onClick={handleTogglePlay}>
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button className="mini-footer-btn" onClick={toggleMute}>
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
