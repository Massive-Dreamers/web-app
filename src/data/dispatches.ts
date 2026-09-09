import roomsImg from '../assets/rooms.png';
import dialogCardImg from '../assets/dialog_card.png';
import buildingsImg from '../assets/buildings.png';
import lobbyImg from '../assets/lobby.png';

export type NewsCategory = 'announcement' | 'devlog' | 'design';
export type NewsCategoryLabel = 'Announcement' | 'Devlog' | 'Design Diary';

export interface Dispatch {
  id: string;
  title: string;
  category: NewsCategoryLabel;
  categoryKey: NewsCategory;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  href: string;
}

export const dispatches: Dispatch[] = [
  {
    id: 'reveal',
    title: 'Massive Dreamers reveals Mind Your Stay for PC',
    category: 'Announcement',
    categoryKey: 'announcement',
    date: 'August 2026',
    readTime: '3 min',
    excerpt:
      'Our debut narrative RPG and point-and-click adventure, set inside a hotel caught between espionage, history, and a mounting civil revolution.',
    image: roomsImg,
    featured: true,
    href: '/news',
  },
  {
    id: 'dialogue',
    title: 'The architecture of branching dialogue in Mind Your Stay',
    category: 'Devlog',
    categoryKey: 'devlog',
    date: 'September 2026',
    readTime: '4 min',
    excerpt:
      'How we built dialogue trees that remember every choice, hesitate under pressure, and reflect the player’s moral alignment across the Safe Haven crisis.',
    image: dialogCardImg,
    href: '/news',
  },
  {
    id: 'noir',
    title: 'Designing Safe Haven: pixel art, noir lighting, spatial mood',
    category: 'Design Diary',
    categoryKey: 'design',
    date: 'July 2026',
    readTime: '5 min',
    excerpt:
      'A close read of the artistic process behind 2D environments that feel tangible, historically grounded, and layered with environmental storytelling.',
    image: buildingsImg,
    href: '/news',
  },
  {
    id: 'audio',
    title: 'Scoring tension: the philosophy of dynamic audio and silence',
    category: 'Devlog',
    categoryKey: 'devlog',
    date: 'June 2026',
    readTime: '4 min',
    excerpt:
      'Why silence and acoustic weight matter as much as melody when building suspense across long corridors and clandestine guest interviews.',
    image: lobbyImg,
    href: '/news',
  },
];
