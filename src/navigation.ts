import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Discovery',
      href: getPermalink('/discovery'),
    },
    {
      text: 'Stories',
      href: getPermalink('/stories'),
    },
    {
      text: 'Study',
      href: getPermalink('/study'),
    },
    {
      text: 'News',
      href: getPermalink('/news'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Liên hệ',
      href: getPermalink('/contact'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Navigate',
      links: [
        { text: 'Home', href: getPermalink('/') },
        { text: 'Discovery', href: getPermalink('/discovery') },
        { text: 'Stories', href: getPermalink('/stories') },
        { text: 'Study', href: getPermalink('/study') },
        { text: 'News', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Information',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'RSS Feed', href: getAsset('/rss.xml') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/tintucthoisutonghop/' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © 2026 <a class="text-blue-600 underline dark:text-muted" href="https://news.info.vn">news.info.vn</a> · All rights reserved.
  `,
};
