# ルートジェネレーター

カタログファイル: `src/catalog/discord.routes.json`

各エントリ:
```json
{
  "name": "discord.post_message",
  "aliases": ["send message"],
  "method": "POST",
  "path": "/channels/:channel_id/messages",
  "description": "Post a message to a channel.",
  "pack": "CORE",
  "confirm": true,
  "schema": {
    "type": "object",
    "properties": {
      "channel_id": {"type":"string"},
      "content": {"type":"string"}
    },
    "required": ["channel_id","content"]
  }
}
```

- `confirm: true` はプレビューを表示します。実行するには `confirm:false` で再度呼び出してください。
- `:channel_id` などのパスパラメータは必須であり、リクエストパスにマージされます。
- `GET/DELETE` の場合、パス以外のフィールドは `query` になります。それ以外の場合は `body` になります。
- メッセージは、オーバーライドしない限り、ポリシーから `allowed_mentions` を自動適用します。

ヘルパーツール:
- `discord.search_tools(query)`
- `discord.help(tool_name)`
- `discord.tools_index()`
