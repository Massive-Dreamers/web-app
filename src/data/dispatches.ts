import roomsImg from '../assets/rooms.png';

export type NewsCategory = 'announcement' | 'devlog' | 'design';
export type NewsCategoryLabel = 'Announcement' | 'Devlog' | 'Design Diary';

// One piece of an article body, rendered in order on the article page.
export type DispatchBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; items: string[] }
  | { type: 'button'; label: string; to: string };

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
  author?: string;
  body: DispatchBlock[];
}

export const dispatches: Dispatch[] = [
  {
    id: 'regular-npc-in-a-disco-like',
    title: 'What if you were a regular NPC in a Disco-like?',
    category: 'Devlog',
    categoryKey: 'devlog',
    date: 'November 2026',
    readTime: '3 min',
    excerpt:
      'In Mind Your Stay, the player IS the NPC: a receptionist with no memories and no character traits, deciding who gets to spend the night at Safe Haven.',
    image: roomsImg,
    featured: true,
    href: '/news/regular-npc-in-a-disco-like',
    author: 'Niyazi from Massive Dreamers team',
    body: [
      {
        type: 'p',
        text: 'Do you remember how Disco Elysium had players talking to all kinds of NPCs with different backgrounds and characters? In the game we’re making, the player IS the NPC, but without any memories and character traits.',
      },
      {
        type: 'p',
        text: 'I love playing Disco Elysium, and I also know that in this industry, making something you love is the first key to success. That’s why me and my teammates wanted to bring our own perspective to this fantastic RPG.',
      },
      {
        type: 'p',
        text: 'With our total budget of 7 EUR a month (we pay the single-user Articy Draft subscription with it), an isometric 3D game with free movement is out of the question.',
      },
      {
        type: 'image',
        src: roomsImg,
        alt: 'Hand-drawn isometric prototype of the Safe Haven hotel rooms',
        caption: 'Prototype: the Safe Haven hotel, hand drawn in an isometric 2D style.',
      },
      {
        type: 'p',
        text: 'That’s why we decided to get the isometric look in 2D (our artist still hates me for this decision). Everything in the game will be hand drawn, including the light, shadows and animations of characters.',
      },
      { type: 'h2', text: 'TL;DR' },
      {
        type: 'p',
        text: 'Mind Your Stay is a hotel management Disco-like where you play as the receptionist of this hotel called Safe Haven. You can’t move, can’t travel around the map for quests. You just sit there, and do your job. Kind of like Papers, Please.',
      },
      { type: 'h2', text: 'More about the game' },
      {
        type: 'p',
        text: 'You’re stationed in the reception desk, and the characters will approach you for rooms. The game introduces all kinds of interesting characters with different motivations, stories and goals.',
      },
      {
        type: 'p',
        text: 'As the receptionist, you decide who gets to spend the night in the hotel. As the player, you meet with these characters, learn their goals, and decide if you want to help them or not.',
      },
      {
        type: 'p',
        text: 'Oh…and of course, you also have skills that help you during the dialogues. There are three main skills: I won’t give you their names yet, but they help the player a) Lie, b) Know the world or c) See through the disguise of the guests. Based on the skill’s level, they will interact with you during dialogue to help you get out of problematic situations.',
      },
      { type: 'h2', text: 'Let’s talk' },
      {
        type: 'p',
        text: 'I’d like everyone to treat this post as a dialogue platform between us. Tell us:',
      },
      {
        type: 'list',
        items: [
          'Why you loved Disco Elysium;',
          'What new mechanics, or types of characters you’d love to see in such a game.',
        ],
      },
      {
        type: 'p',
        text: 'We’ll be more than pleased to take all of these ideas into consideration.',
      },
      { type: 'button', label: 'We are open for feedbacks', to: '/contact' },
      {
        type: 'p',
        text: 'And, one last thing…you can wishlist Mind Your Stay right now, and follow the page for more updates.',
      },
    ],
  },
];
