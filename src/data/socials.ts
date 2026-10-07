import type { BrandName } from '../components/BrandIcon';

export interface Social {
  icon: BrandName;
  label: string;
  handle: string;
  href: string;
}

// Single source for the footer and the /links page (the printed QR target).
// Add a channel here and it shows up in both places.
export const socials: Social[] = [
  {
    icon: 'discord',
    label: 'Discord',
    handle: 'Join the server',
    href: 'https://discord.gg/Q45kJ3k2WW',
  },
  {
    icon: 'instagram',
    label: 'Instagram',
    handle: '@massivedreamersstudio',
    href: 'https://www.instagram.com/massivedreamersstudio/',
  },
  {
    icon: 'tiktok',
    label: 'TikTok',
    handle: '@massive.dreamers',
    href: 'https://www.tiktok.com/@massive.dreamers',
  },
  {
    icon: 'reddit',
    label: 'Reddit',
    handle: 'u/massive-dreamers',
    href: 'https://www.reddit.com/user/massive-dreamers/',
  },
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    handle: 'Massive Dreamers',
    href: 'https://www.linkedin.com/company/massivedreamers/posts/?feedView=all',
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    handle: 'Massive Dreamers',
    href: 'https://www.facebook.com/profile.php?id=61563914828343',
  },
];
