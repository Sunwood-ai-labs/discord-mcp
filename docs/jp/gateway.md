# ゲートウェイイベント

`@discordjs/ws` を使用します。`GATEWAY_INTENTS` でインテントを設定します。デフォルトは Guilds|GuildMessages です。

ツール:
- `discord.gateway_subscribe(event_types?, guild_ids?, channel_ids?)`
- `discord.gateway_get_events(max=50)`
- `discord.gateway_info()`

パターン: フィルターを購読する → `gateway_get_events` でポーリングする。
