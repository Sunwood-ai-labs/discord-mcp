# Configuration

Copy `.env.example` to `.env` and set:

- `DISCORD_BOT_TOKEN`  Ebot token
- `ALLOW_GUILD_IDS`  Ecomma-separated allow-list (recommended)
- `ALLOW_CHANNEL_IDS`  Ecomma-separated allow-list (recommended)
- `ALLOWED_MENTIONS`  E`none|users|roles|everyone` (default: `none`)
- `GATEWAY_INTENTS`  Ebitfield; enable MESSAGE_CONTENT only if approved
- Packs: `PACK_ADMIN`, `PACK_MEDIA`, `PACK_COMMUNITY`, `PACK_DEVTOOLS`
- Optional: `ENABLE_RAW_REST`  Eenables whitelisted raw REST escape hatch

Build/run:
```bash
npm run build
npm start
```


