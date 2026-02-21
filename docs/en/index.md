---
layout: home

hero:
  name: "Discord MCP"
  text: "Power Your AI with Discord"
  tagline: "The bridge between LLMs and Discord API. Safe, modular, and declarative."
  actions:
    - theme: brand
      text: "🚀 Get Started"
      link: /en/configuration
    - theme: alt
      text: "📂 View Examples"
      link: /en/examples
    - theme: alt
      text: "⭐ GitHub"
      link: https://github.com/bennettschwartz/discord-mcp

features:
  - icon: 🛠️
    title: "Dynamic Route Generation"
    details: "Automatically syncs with Discord API routes to provide up-to-date tools."
  - icon: 📡
    title: "Real-time Gateway"
    details: "React to Discord events instantly with optimized event streaming."
  - icon: 🔒
    title: "Enterprise Grade Safety"
    details: "Granular permissions and Human-in-the-loop verification built-in."
  - icon: 🧩
    title: "Modular Architecture"
    details: "Scale your agent with functional packs: Admin, Media, and more."
---

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Enable desired packs
echo "PACK_ADMIN=1" >> .env
echo "PACK_MEDIA=1" >> .env
echo "PACK_COMMUNITY=1" >> .env
echo "PACK_DEVTOOLS=1" >> .env

# Run in development mode
npm run dev
```
