#!/usr/bin/env node
import { config } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Load .env from the project directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
config({ path: join(projectRoot, '.env') });
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { createServer } from 'node:http';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateTools } from './generator.js';
import { searchToolsTool, helpTool, toolsIndexTool, type ToolDoc } from './tools/helpers.js';
import { listChannelsTool } from './tools/list_channels.js';
import { fetchMessagesTool } from './tools/fetch_messages.js';
import { listBansTool, banUserTool, unbanUserTool } from './tools/bans.js';
import { listEmojisTool, createEmojiTool, deleteEmojiTool } from './tools/emojis.js';
import { listGuildStickersTool, createGuildStickerTool, deleteGuildStickerTool } from './tools/stickers.js';
import { listScheduledEventsTool, createScheduledEventTool, deleteScheduledEventTool } from './tools/scheduled_events.js';
import { listPublicArchivedThreadsTool, listPrivateArchivedThreadsTool, listJoinedPrivateArchivedThreadsTool } from './tools/threads.js';
import { createInviteTool, deleteInviteTool } from './tools/invites.js';
import { getMemberTool, addMemberRoleTool, removeMemberRoleTool, kickMemberTool } from './tools/members.js';
import { clearAllReactionsTool, removeUserReactionTool } from './tools/reactions_more.js';
import { postMessageWithFilesTool } from './tools/files.js';

import { postMessageTool } from './tools/post_message.js';
import { replyMessageTool } from './tools/reply_message.js';
import { addReactionTool, deleteReactionTool } from './tools/reaction_tools.js';
import { createThreadTool } from './tools/create_thread.js';
import { listWebhooksTool, createWebhookTool, executeWebhookTool, deleteWebhookTool } from './tools/webhook_tools.js';
import { listPinsTool, pinMessageTool, unpinMessageTool } from './tools/pins.js';
import { bulkDeleteMessagesTool } from './tools/bulk_delete.js';
import { listRolesTool, createRoleTool, deleteRoleTool } from './tools/roles.js';
import { createChannelTool, editChannelTool, deleteChannelTool } from './tools/channels_admin.js';
import { getUserTool, dmUserTool } from './tools/users.js';
import { listCommandsTool, upsertCommandTool, deleteCommandTool } from './tools/interactions.js';
import { setChannelPermissionTool } from './tools/permissions.js';
import { triggerTypingTool } from './tools/typing.js';
import { rawRestTool } from './tools/raw_rest.js';
import { GatewayManager } from './gateway.js';
import { gatewaySubscribeTool, gatewayGetEventsTool, gatewayInfoTool } from './tools/gateway_tools.js';
import { DiscordClient } from './discord.js';
import { Policy } from './policy.js';
import type { ServerConfig } from './types.js';

function parseEnvList(v?: string): string[] | undefined {
  return v && v.trim().length ? v.split(',').map(s => s.trim()) : undefined;
}

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error('Missing DISCORD_BOT_TOKEN');
  process.exit(1);
}

const cfg: ServerConfig = {
  allow: {
    guildIds: parseEnvList(process.env.ALLOW_GUILD_IDS),
    channelIds: parseEnvList(process.env.ALLOW_CHANNEL_IDS),
  },
  defaultAllowedMentions: (process.env.ALLOWED_MENTIONS as any) || 'none'
};

const policy = new Policy(cfg);
const dc = new DiscordClient(token);

// Gateway setup
const rawIntents = process.env.GATEWAY_INTENTS;
const defaultIntents = (1 << 0) | (1 << 9); // Guilds | GuildMessages
const intents = rawIntents ? Number(rawIntents) : defaultIntents;
const gw = new GatewayManager(token, intents);
gw.start();

// Route generator: load catalog
import routes from './catalog/discord.routes.json' with { type: 'json' };

function parsePacksEnabled() {
  // Force enable only CORE, COMMUNITY and DEVTOOLS to stay under the 100-tool limit
  const packs = new Set<string>(['CORE', 'COMMUNITY', 'DEVTOOLS']);
  return packs;
}

const packsEnabled = parsePacksEnabled();
const generated = generateTools(routes as any, dc, policy, { packsEnabled, defaultAllowedMentions: policy.allowedMentions() });

// 1. Initialize tool collection
const allTools: any[] = [];

// 2. Register custom implementations
allTools.push(listChannelsTool(dc, policy));
allTools.push(replyMessageTool(dc, policy, policy.allowedMentions()));
allTools.push(deleteReactionTool(dc, policy));
allTools.push(listWebhooksTool(dc, policy));
allTools.push(createWebhookTool(dc, policy));
allTools.push(executeWebhookTool(dc));
allTools.push(deleteWebhookTool(dc));
allTools.push(createChannelTool(dc));
allTools.push(editChannelTool(dc, policy));
allTools.push(deleteChannelTool(dc, policy));
allTools.push(getUserTool(dc));
allTools.push(dmUserTool(dc));
allTools.push(upsertCommandTool(dc));
allTools.push(deleteCommandTool(dc));
allTools.push(setChannelPermissionTool(dc, policy));
allTools.push(rawRestTool(dc, true)); // Force enabled for rich embed testing
allTools.push(gatewaySubscribeTool(gw));
allTools.push(gatewayGetEventsTool(gw));
allTools.push(gatewayInfoTool(gw));
allTools.push(listBansTool(dc));
allTools.push(createEmojiTool(dc));
allTools.push(deleteEmojiTool(dc));
allTools.push(listGuildStickersTool(dc));
allTools.push(createGuildStickerTool(dc));
allTools.push(deleteGuildStickerTool(dc));
allTools.push(listScheduledEventsTool(dc));
allTools.push(createScheduledEventTool(dc));
allTools.push(deleteScheduledEventTool(dc));
allTools.push(listPublicArchivedThreadsTool(dc, policy));
allTools.push(listPrivateArchivedThreadsTool(dc, policy));
allTools.push(listJoinedPrivateArchivedThreadsTool(dc, policy));
allTools.push(deleteInviteTool(dc));
allTools.push(addMemberRoleTool(dc));
allTools.push(removeMemberRoleTool(dc));
allTools.push(clearAllReactionsTool(dc, policy));
allTools.push(removeUserReactionTool(dc, policy));
allTools.push(postMessageWithFilesTool(dc, policy, policy.allowedMentions()));

// 3. Register generated tools
for (const t of generated) {
  allTools.push({
    name: t.entry.name,
    description: t.entry.description,
    inputSchema: t.handler.inputSchema,
    handler: t.handler.handler,
    pack: t.entry.pack || 'CORE',
    aliases: t.entry.aliases,
    path: t.entry.path,
    method: t.entry.method
  });
}

// 4. Build temporary docsIndex for helpers
const tempDocs: ToolDoc[] = allTools.map(t => ({
  name: t.name,
  description: t.description,
  aliases: (t as any).aliases || [],
  pack: (t as any).pack || 'CUSTOM',
  path: (t as any).path || '',
  method: (t as any).method || 'MANUAL'
}));

// 5. Register helper tools
allTools.push(searchToolsTool(tempDocs));
allTools.push(helpTool(tempDocs));
allTools.push(toolsIndexTool(tempDocs));

// MCP server
const server = new McpServer(
  {
    name: 'mcp-discord-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 6. Perform actual registration to McpServer
for (const tool of allTools) {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema.shape,
    async (args: any) => {
      try {
        const result = tool.handler({ input: args });
        const contents = [];
        for await (const output of result) {
          if (output.content) contents.push(...output.content);
        }
        return { content: contents };
      } catch (error: any) {
        return { content: [{ type: 'text', text: error.message || String(error) }] };
      }
    }
  );
}


// Tool registration moved to unified loop above


// Configure transport based on environment
const transportType = process.env.TRANSPORT || 'stdio';
const port = parseInt(process.env.PORT || '3000');

if (transportType === 'http') {
  // Create HTTP server for SSE transport
  const httpServer = createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/sse') {
      // Create transport for this connection
      const transport = new SSEServerTransport('/message', res);
      await transport.start();
      await server.connect(transport);
    } else if (req.method === 'POST' && req.url === '/message') {
      // Handle POST messages
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', async () => {
        try {
          const parsedBody = JSON.parse(body);
          // This needs the specific transport instance for this connection
          // For now, return a simple response
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'received' }));
        } catch (error) {
          res.writeHead(400);
          res.end('Invalid JSON');
        }
      });
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  httpServer.listen(port, () => {
    console.error(`MCP Server running on http://localhost:${port}/sse`);
  });
} else {
  // Use stdio transport
  const transport = new StdioServerTransport();
  console.error('MCP Server running with stdio transport');
  await server.connect(transport);
}