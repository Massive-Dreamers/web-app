import roomsImg from '../assets/rooms.png';
import dialogCardImg from '../assets/dialog_card.png';
import buildingsImg from '../assets/buildings.png';

export type GameStatus = 'active' | 'concept';

export interface Game {
  slug: string;
  index: string;
  title: string;
  status: GameStatus;
  statusLabel: string;
  release: string;
  genre: string;
  platform: string;
  description: string;
  image: string;
  href: string | null;
  flagship: boolean;
}

export const games: Game[] = [
  {
    slug: 'mind-your-stay',
    index: 'I',
    title: 'Mind Your Stay',
    status: 'active',
    statusLabel: 'In development',
    release: '2027',
    genre: 'Narrative RPG',
    platform: 'PC (Steam)',
    description:
      'A noir management adventure inside Hotel Safe Haven during an escalating revolution. Talk to guests, weigh moral tradeoffs, and see who you are when the corridors get quiet.',
    image: roomsImg,
    href: '/mind-your-stay',
    flagship: true,
  },
  {
    slug: 'echo-horizon',
    index: 'II',
    title: 'Project Echo Horizon',
    status: 'concept',
    statusLabel: 'In planning',
    release: 'TBA',
    genre: 'Sci-fi mystery',
    platform: 'PC',
    description:
      'A psychological thriller aboard an isolated deep-space listening station. Decode anomalous audio, unravel crew paranoia, decide what the signal was really saying.',
    image: buildingsImg,
    href: '/games',
    flagship: false,
  },
  {
    slug: 'chrono-archive',
    index: 'III',
    title: 'Project Chrono Archive',
    status: 'concept',
    statusLabel: 'In planning',
    release: 'TBA',
    genre: 'Historical investigation',
    platform: 'PC',
    description:
      'An investigative puzzle set inside a secret archive where the histories you file rearrange the physical present.',
    image: dialogCardImg,
    href: '/games',
    flagship: false,
  },
];
