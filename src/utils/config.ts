// Hardcoded config constants to avoid astrowind:config virtual module issues in build
// These values should match src/config.yaml

export const SITE = {
  name: 'News.info.vn',
  site: 'https://news.info.vn',
  base: '/',
  trailingSlash: false,
};

export const I18N = {
  language: 'vi',
  textDirection: 'ltr',
};

export const METADATA = {
  title: {
    default: 'News.info.vn',
    template: '%s',
  },
  description: 'Khám phá tri thức, câu chuyện và nghiên cứu về khoa học, công nghệ, tâm lý và triết học.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
  },
};

export const APP_BLOG = {
  isEnabled: true,
  postsPerPage: 10,
  isRelatedPostsEnabled: true,
  relatedPostsCount: 4,
  post: {
    isEnabled: true,
    permalink: '/%slug%',
    robots: {
      index: true,
      follow: true,
    },
  },
  list: {
    isEnabled: true,
    pathname: 'blog',
    robots: {
      index: true,
      follow: true,
    },
  },
  category: {
    isEnabled: true,
    pathname: 'category',
    robots: {
      index: true,
      follow: true,
    },
  },
  tag: {
    isEnabled: true,
    pathname: 'tag',
    robots: {
      index: true,
      follow: true,
    },
  },
};

export const UI = {
  theme: 'system',
  tokens: {
    default: {
      colors: {
        primary: 'rgb(0 124 220)',
        secondary: 'rgb(30 58 138)',
        accent: 'rgb(109 40 217)',
        default: 'rgb(255 255 255)',
        muted: 'rgb(107 114 128)',
      },
      fonts: {
        sans: 'var(--aw-font-sans, ui-sans-serif)',
        serif: 'var(--aw-font-serif, ui-serif)',
        heading: 'var(--aw-font-heading, ui-sans-serif)',
      },
    },
  },
};

export const ANALYTICS = {
  vendors: {
    googleAnalytics: {
      id: undefined,
    },
  },
};
