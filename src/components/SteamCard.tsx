import BrandIcon from './BrandIcon';
import steamCapsule from '../assets/steam_capsule.jpg';
import { STEAM_URL } from '../data/games';
import '../styles/SteamCard.css';

// Our own take on Steam's store widget, in Steam's palette. The official iframe
// lets its wishlist bar hang outside the card; this keeps everything inside.
// `compact` holds the side-by-side layout on phones, for the floating promo.
export default function SteamCard({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={STEAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`steam-card${compact ? ' steam-card--compact' : ''}`}
    >
      <span className="steam-card-head">
        <BrandIcon name="steam" size={28} className="steam-card-logo" />
        <span className="steam-card-title">
          Mind Your Stay <span>on Steam</span>
        </span>
      </span>
      <span className="steam-card-body">
        <img src={steamCapsule} alt="" className="steam-card-capsule" />
        <span className="steam-card-copy">
          Safe Haven is a hotel caught in the middle of a war, and you are its
          receptionist. Accept guests, assign them rooms, uncover their secrets, and
          keep them safe.
        </span>
      </span>
      <span className="steam-card-foot">
        <span className="steam-card-status">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-label="Windows">
            <path d="M0 0h7.5v7.5H0zM8.5 0H16v7.5H8.5zM0 8.5h7.5V16H0zM8.5 8.5H16V16H8.5z" />
          </svg>
          Coming soon
        </span>
        <span className="steam-card-btn">Wishlist on Steam</span>
      </span>
    </a>
  );
}
