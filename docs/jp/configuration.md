# 設定

`.env.example` をコピーして `.env` を作成し、以下を設定します。

- `DISCORD_BOT_TOKEN` — Botのトークン
- `ALLOW_GUILD_IDS` — 許可するギルドIDのカンマ区切りリスト（推奨）
- `ALLOW_CHANNEL_IDS` — 許可するチャンネルIDのカンマ区切りリスト（推奨）
- `ALLOWED_MENTIONS` — `none|users|roles|everyone` (デフォルト: `none`)
- `GATEWAY_INTENTS` — ビットフィールド。承認されている場合のみ `MESSAGE_CONTENT` を有効化
- パック: `PACK_ADMIN`, `PACK_MEDIA`, `PACK_COMMUNITY`, `PACK_DEVTOOLS`
- オプション: `ENABLE_RAW_REST` — ホワイトリスト化された生のRESTエスケープハッチを有効化

ビルド/実行:
```bash
npm run build
npm start
```
