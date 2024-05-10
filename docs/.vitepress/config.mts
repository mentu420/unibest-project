import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'unibeset-vitepress-blog',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zn: {
      label: '简体中文',
      lang: 'zh-Hans',
      themeConfig: {
        nav: [
          {
            text: '首页',
            link: '/zh/',
          },
        ],
      },
    },
  },
})
