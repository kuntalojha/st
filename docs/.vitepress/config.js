import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '📚 Software Testing',
  base: '/st/',
  description: 'Complete study notes for Software Testing — Units, Questions & More',
  lang: 'en-IN',

  // ── Head tags (favicon, og-image, fonts) ─────────────────────────────────
  head: [
    ['link', { rel: 'icon', href: '/st/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Software Testing Notes' }],
    ['meta', {
      property: 'og:description',
      content: 'Complete study notes for Software Testing — Units, Questions & More',
    }],
    // Google Fonts — Inter for UI, JetBrains Mono for code
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
    }],
  ],

  // ── Markdown tweaks ───────────────────────────────────────────────────────
  markdown: {
    theme: { light: 'github-light', dark: 'one-dark-pro' },
    lineNumbers: true,
  },

  // ── Last updated ──────────────────────────────────────────────────────────
  lastUpdated: true,

  themeConfig: {
    // ── Logo ───────────────────────────────────────────────────────────────
    logo: { src: '/logo.svg', alt: 'ST Notes' },
    siteTitle: 'ST Notes',

    // ── Search (built-in, zero config) ────────────────────────────────────
    search: {
      provider: 'local',
      options: {
        placeholder: 'Search notes…',
      },
    },

    // ── Top Nav ───────────────────────────────────────────────────────────
    // Nav links support dropdowns via `items:` — no `link:` on the parent.
    nav: [
      { text: '🏠 Home', link: '/' },

      // ── Units dropdown ─────────────────────────────────────────────────
      {
        text: '📖 Units',
        items: [
          {
            text: '📘 Unit 01 — Basics of Software Testing',
            items: [
              { text: '📄 Part 1', link: '/st/units/unit-1/p1' },
              { text: '📄 Part 2', link: '/st/units/unit-1/p2' },
              { text: '📄 Part 3', link: '/st/units/unit-1/p3' },
              { text: '📄 Part 4', link: '/st/units/unit-1/p4' },
              { text: '📄 Part 5', link: '/st/units/unit-1/p5' },
              { text: '📄 Part 6', link: '/st/units/unit-1/p6' },
            ],
          },
          {
            text: '📘 Unit 02 — Types & Levels of Testing',
            items: [
              { text: '📄 Part 1', link: '/st/units/unit-2/p1' },
              { text: '📄 Part 2', link: '/st/units/unit-2/p2' },
              { text: '📄 Part 3', link: '/st/units/unit-2/p3' },
              { text: '📄 Part 4', link: '/st/units/unit-2/p4' },
              { text: '📄 Part 5', link: '/st/units/unit-2/p5' },
              { text: '📄 Part 6', link: '/st/units/unit-2/p6' },
            ],
          },
          {
            text: '📘 Unit 03 — Testing Methods',
            items: [
              { text: '📄 Part 1', link: '/st/units/unit-3/p1' },
              { text: '📄 Part 2', link: '/st/units/unit-3/p2' },
              { text: '📄 Part 3', link: '/st/units/unit-3/p3' },
              { text: '📄 Part 4', link: '/st/units/unit-3/p4' },
              { text: '📄 Part 5', link: '/st/units/unit-3/p5' },
              { text: '📄 Part 6', link: '/st/units/unit-3/p6' },
            ],
          },
          {
            text: '📘 Unit 04 — Test Management & Defect Management',
            items: [
              { text: '📄 Part 1', link: '/st/units/unit-4/p1' },
              { text: '📄 Part 2', link: '/st/units/unit-4/p2' },
              { text: '📄 Part 3', link: '/st/units/unit-4/p3' },
              { text: '📄 Part 4', link: '/st/units/unit-4/p4' },
              { text: '📄 Part 5', link: '/st/units/unit-4/p5' },
              { text: '📄 Part 6', link: '/st/units/unit-4/p6' },
            ],
          },
        ],
      },

      // ── Questions bank ─────────────────────────────────────────────────
      {
        text: '❓ Question Bank',
        items: [
          { text: 'Previous Papers',    link: '/questions/papers'  },
        ],
      },

      // ── Quick links ────────────────────────────────────────────────────
      {
        text: '🔗 Quick Links',
        items: [
          { text: 'Syllabus PDF',       link: '/syllabus' },
          { text: 'Reference Books',    link: '/books'    },
          { text: 'Useful Tools',       link: '/tools'    },
        ],
      },
    ],

    // ── Sidebar ───────────────────────────────────────────────────────────
    // Each group is collapsible. `collapsed: false` = open on load.
    // `collapsed: true` = closed on load (great for units students haven't reached yet).
        sidebar: [
      {
        text: '📘 Unit 01 — Basics of Software Testing',
        collapsed: false,
        items: [
          { text: '📄 Part 1', link: '/st/units/unit-1/p1' },
          { text: '📄 Part 2', link: '/st/units/unit-1/p2' },
          { text: '📄 Part 3', link: '/st/units/unit-1/p3' },
          { text: '📄 Part 4', link: '/st/units/unit-1/p4' },
          { text: '📄 Part 5', link: '/st/units/unit-1/p5' },
          { text: '📄 Part 6', link: '/st/units/unit-1/p6' },
        ],
      },

      {
        text: '📘 Unit 02 — Types & Levels of Testing',
        collapsed: true,
        items: [
          { text: '📄 Part 1', link: '/st/units/unit-2/p1' },
          { text: '📄 Part 2', link: '/st/units/unit-2/p2' },
          { text: '📄 Part 3', link: '/st/units/unit-2/p3' },
          { text: '📄 Part 4', link: '/st/units/unit-2/p4' },
          { text: '📄 Part 5', link: '/st/units/unit-2/p5' },
          { text: '📄 Part 6', link: '/st/units/unit-2/p6' },
        ],
      },

      {
        text: '📘 Unit 03 — Testing Methods',
        collapsed: true,
        items: [
          { text: '📄 Part 1', link: '/st/units/unit-3/p1' },
          { text: '📄 Part 2', link: '/st/units/unit-3/p2' },
          { text: '📄 Part 3', link: '/st/units/unit-3/p3' },
          { text: '📄 Part 4', link: '/st/units/unit-3/p4' },
          { text: '📄 Part 5', link: '/st/units/unit-3/p5' },
          { text: '📄 Part 6', link: '/st/units/unit-3/p6' },
        ],
      },

      {
        text: '📘 Unit 04 — Test Management & Defect Management',
        collapsed: true,
        items: [
          { text: '📄 Part 1', link: '/st/units/unit-4/p1' },
          { text: '📄 Part 2', link: '/st/units/unit-4/p2' },
          { text: '📄 Part 3', link: '/st/units/unit-4/p3' },
          { text: '📄 Part 4', link: '/st/units/unit-4/p4' },
          { text: '📄 Part 5', link: '/st/units/unit-4/p5' },
          { text: '📄 Part 6', link: '/st/units/unit-4/p6' },
        ],
      },
      // ── DIVIDER / EXTRAS ──────────────────────────────────────────────
      {
        text: '❓ Question Bank',
        collapsed: true,
        items: [
          { text: 'Previous Papers',   link: '/questions/papers'  },
        ],
      },

      {
        text: '📎 Resources',
        collapsed: true,
        items: [
          { text: 'Syllabus PDF',    link: '/syllabus' },
          { text: 'Reference Books', link: '/books'    },
          { text: 'Useful Tools',    link: '/tools'    },
        ],
      },
    ],

    // ── Outline (on-page ToC on the right) ────────────────────────────────
    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    // ── Edit link ─────────────────────────────────────────────────────────
    editLink: {
      pattern: 'https://github.com/kuntalojha/st/edit/main/docs/:path',
      text: '✏️ Edit this page on GitHub',
    },

    // ── Last updated label ────────────────────────────────────────────────
    lastUpdated: {
      text: '🕐 Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },

    // ── Prev / Next links ─────────────────────────────────────────────────
    docFooter: {
      prev: '⬅️ Previous',
      next: 'Next ➡️',
    },

    // ── Return to top ─────────────────────────────────────────────────────
    returnToTopLabel: '⬆️ Back to top',

    // ── Footer ────────────────────────────────────────────────────────────
    footer: {
      message: 'Released under the MIT License.',
      copyright:
        'Copyright © 2026 <a href="https://kuntalojha.github.io/MRKUNTALOJHA/" target="_blank">Kuntal Ojha</a>',
    },

    // ── Social links ──────────────────────────────────────────────────────
    socialLinks: [
      { icon: 'github',   link: 'https://github.com/kuntalojha'                   },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/mrkuntalojha/'        },
      { icon: 'twitter',  link: 'https://x.com/kuntalojha'                        },
      // VitePress only allows one `youtube` icon — pick the main channel
      { icon: 'youtube',  link: 'https://www.youtube.com/@kuntalojhadev'           },
    ],
  },
});
