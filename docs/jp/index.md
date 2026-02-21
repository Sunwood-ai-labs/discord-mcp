---
layout: home

hero:
  name: "Discord MCP"
  text: "AIをDiscordと連携させよう"
  tagline: "LLMとDiscord APIの架け橋。安全、モジュール式、宣言的な統合を提供します。"
  actions:
    - theme: brand
      text: "🚀 スタートガイド"
      link: /jp/configuration
    - theme: alt
      text: "📂 使用例を見る"
      link: /jp/examples
    - theme: alt
      text: "⭐ GitHub"
      link: https://github.com/bennettschwartz/discord-mcp

features:
  - icon: 🛠️
    title: "動的なルート生成"
    details: "Discord APIルートと自動的に同期し、常に最新のツールを提供します。"
  - icon: 📡
    title: "リアルタイムゲートウェイ"
    details: "最適化されたイベントストリーミングで、Discordのイベントに即座に反応。"
  - icon: 🔒
    title: "エンタープライズ級の安全性"
    details: "きめ細かな権限管理と、人間による確認（Human-in-the-loop）を内蔵。"
  - icon: 🧩
    title: "モジュール式アーキテクチャ"
    details: "Admin、Mediaなどの機能パックで、エージェントを自在に拡張。"
---

## クイックスタート

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env

# 必要なパックを有効化
echo "PACK_ADMIN=1" >> .env
echo "PACK_MEDIA=1" >> .env
echo "PACK_COMMUNITY=1" >> .env
echo "PACK_DEVTOOLS=1" >> .env

# 開発モードで実行
npm run dev
```
