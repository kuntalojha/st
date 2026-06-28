import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Software Testing',
  base: '/st/',
  description: 'NOTE',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Data Structure', link: 'ds' },
      { text: 'Question', link: 'question' },
    ],

    sidebar: [
      {
        text: 'Software Testing',
        items: [
          { text: 'Unit 01', link: '/st/units/unit-1/p1' },
          { text: 'Unit 02', link: '/st/units/unit-2/p1' },
          { text: 'Unit 03', link: '/st/units/unit-3/p1' },
        ],
      },
    ],
     footer: {
  message: 'Released under the MIT License.',
  copyright:
    'Copyright © 2026 <a href="https://kuntalojha.github.io/MRKUNTALOJHA/" target="_blank">Kuntal Ojha</a>'
},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kuntalojha' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/mrkuntalojha/' },
      { icon: 'twitter', link: 'https://x.com/kuntalojha' },
      { icon: 'youtube', link: 'https://www.youtube.com/@kuntalojhadev' },
      { icon: 'youtube', link: 'https://www.youtube.com/@kuntalojha' },
    ],
  },
});
