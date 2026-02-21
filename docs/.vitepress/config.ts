import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Discord MCP',
  description: 'Powerful Discord integration for AI agents via Model Context Protocol',
  base: '/discord-mcp/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#5865F2' }]
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'API Reference', link: '/en/api/' },
          { text: 'GitHub', link: 'https://github.com/bennettschwartz/discord-mcp' }
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Getting Started', link: '/en/' },
              { text: 'Configuration', link: '/en/configuration' },
              { text: 'Examples', link: '/en/examples' }
            ]
          },
          {
            text: 'Features',
            items: [
              { text: 'Route Generator', link: '/en/route-generator' },
              { text: 'Gateway Events', link: '/en/gateway' },
              { text: 'Tool Packs', link: '/en/packs' }
            ]
          }
        ]
      }
    },
    jp: {
      label: '日本語',
      lang: 'ja',
      link: '/jp/',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/jp/' },
          { text: 'ガイド', link: '/jp/guide/' },
          { text: 'APIリファレンス', link: '/jp/api/' },
          { text: 'GitHub', link: 'https://github.com/bennettschwartz/discord-mcp' }
        ],
        sidebar: [
          {
            text: 'はじめに',
            items: [
              { text: 'スタートガイド', link: '/jp/' },
              { text: '設定', link: '/jp/configuration' },
              { text: '例', link: '/jp/examples' }
            ]
          },
          {
            text: '機能',
            items: [
              { text: 'ルートジェネレーター', link: '/jp/route-generator' },
              { text: 'ゲートウェイイベント', link: '/jp/gateway' },
              { text: 'ツールパック', link: '/jp/packs' }
            ]
          }
        ]
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bennettschwartz/discord-mcp' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024'
    },
    search: {
      provider: 'local'
    }
  }
})