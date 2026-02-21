# 例

## メッセージを送信する（プレビューして送信）
1) プレビュー:
```json
{ "tool": "discord.post_message", "input": { "channel_id": "123", "content": "Hello world!" } }
```
2) 実行:
```json
{ "tool": "discord.post_message", "input": { "channel_id": "123", "content": "Hello world!", "confirm": false } }
```

## メッセージに返信する
```json
{ "tool": "discord.reply", "input": { "channel_id": "123", "message_id": "456", "content": "On it.", "confirm": false } }
```

## リアクションを追加する
```json
{ "tool": "discord.add_reaction", "input": { "channel_id": "123", "message_id": "456", "emoji": "👍" } }
```

## 招待を作成する
```json
{ "tool": "discord.create_invite", "input": { "channel_id": "123", "max_age": 86400, "max_uses": 1 } }
```

## Webhookを作成して実行する
```json
{ "tool": "discord.webhook_create", "input": { "channel_id": "123", "name": "Build Bot" } }
```
*(トークンを安全に保管してください)*
```json
{ "tool": "discord.webhook_execute", "input": { "webhook_id": "999", "token": "xxxxx", "content": "Deployed ✁E } }
```

## ゲートウェイ：イベントの購読と取得
```json
{ "tool": "discord.gateway_subscribe", "input": { "event_types": ["MESSAGE_CREATE"], "channel_ids": ["123"] } }
```
```json
{ "tool": "discord.gateway_get_events", "input": { "max": 50 } }
```

## ユーザーのBANと解除（破壊的；プレビューして実行）
```json
{ "tool": "discord.ban_user", "input": { "guild_id": "42", "user_id": "777", "delete_message_seconds": 3600 } }
```
```json
{ "tool": "discord.ban_user", "input": { "guild_id": "42", "user_id": "777", "delete_message_seconds": 3600, "confirm": false } }
```
```json
{ "tool": "discord.unban_user", "input": { "guild_id": "42", "user_id": "777", "confirm": false } }
```

## タグ付きのフォーラム投稿を作成する
```json
{ "tool": "discord.create_forum_post", "input": { "channel_id": "123", "name": "Feedback", "message": { "content": "Share your thoughts" }, "applied_tags": ["tag-id-1"] , "confirm": false } }
```

## ツールの検索 / ヘルプ / インデックス
```json
{ "tool": "discord.search_tools", "input": { "query": "invite" } }
```
```json
{ "tool": "discord.help", "input": { "tool_name": "discord.create_invite" } }
```
```json
{ "tool": "discord.tools_index", "input": {} }
```


## コードから招待を取得する
```json
{ "tool": "discord.get_invite", "input": { "code": "abc123", "with_counts": true, "with_expiration": true } }
```

## アクティブなスレッドのリストを取得（ギルド）
```json
{ "tool": "discord.list_active_threads_guild", "input": { "guild_id": "42" } }
```

## ステージインスタンスの変更（プレビューして実行）
```json
{ "tool": "discord.modify_stage_instance", "input": { "channel_id": "999", "topic": "Town Hall" } }
```
```json
{ "tool": "discord.modify_stage_instance", "input": { "channel_id": "999", "topic": "Town Hall", "confirm": false } }
```

## ギルドのWebhookのリストを取得
```json
{ "tool": "discord.list_guild_webhooks", "input": { "guild_id": "42" } }
```

## 特定のギルドBANを取得
```json
{ "tool": "discord.get_guild_ban", "input": { "guild_id": "42", "user_id": "777" } }
```

## ステッカーパックとステッカー情報
```json
{ "tool": "discord.list_sticker_packs", "input": {} }
```
```json
{ "tool": "discord.get_sticker", "input": { "sticker_id": "1234567890" } }
```

## リンクされたロールのメタデータ（DEVTOOLSパック）
```json
{ "tool": "discord.set_role_connections_metadata", "input": { "application_id": "app_123", "metadata": [{ "key":"level", "name":"Level", "description":"Player level", "type": 7 }] } }
```


## 元のインタラクションレスポンスを取得
```json
{ "tool": "discord.get_original_interaction_response", "input": { "application_id": "app_123", "interaction_token": "token_abc" } }
```

## ギルドプレビュー
```json
{ "tool": "discord.get_guild_preview", "input": { "guild_id": "42" } }
```

## スケジュールされたイベントを取得
```json
{ "tool": "discord.get_scheduled_event", "input": { "guild_id": "42", "event_id": "999" } }
```

## コマンドの一括上書き（グローバル）
```json
{ "tool": "discord.bulk_overwrite_commands_global", "input": { "application_id": "app_123", "commands": [{ "name":"ping", "description":"pong", "type":1 }] } }
```

## 単一のコマンドを取得（ギルド）
```json
{ "tool": "discord.get_command_guild", "input": { "application_id": "app_123", "guild_id": "42", "command_id": "cmd_777" } }
```

## リンクされたロールのメタデータ（取得）
```json
{ "tool": "discord.get_role_connections_metadata", "input": { "application_id": "app_123" } }
```
