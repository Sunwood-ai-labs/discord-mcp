import { REST } from '@discordjs/rest';
import { Routes, ChannelType } from 'discord-api-types/v10';
import { config } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env') });

const token = process.env.DISCORD_BOT_TOKEN;
const parentChannelId = '1474774608531161109';

if (!token) {
    console.error('Missing DISCORD_BOT_TOKEN');
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

const embed = {
    title: '🍝 【保存版】至高のカルボナーラ 🍝',
    description: `**至高のレシピ：特製カルボナーラ (In Thread)** 🍝✨

**材料 (1人分):**
- パスタ (1.6mm): 100g
- パンチェッタ（またはベーコン）: 40g
- 全卵: 1個
- 卵黄: 1個
- ペルメザンチーズ: 30g
- 黒胡椒: 適量
- 塩（ゆで用）: 適量

**作り方:**
1. **下準備:** 卵とチーズを混ぜてソースを作ります。
2. **炒める:** パンチェッタをカリカリになるまで炒めます。
3. **茹でる:** パスタをアルデンテに。
4. **仕上げ:** パスタとパンチェッタを合わせ、火を止めてから卵液を投入！

**ポイント:**
- スレッド内でも、この通り鮮やかなカラー枠とサムネイルが表示されます！🌟🎨`,
    color: 16753920, // Gold
    thumbnail: {
        url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop'
    },
    footer: {
        text: 'スレッド限定の隠し味：情熱を少々。🍷'
    }
};

async function createThreadAndPost() {
    try {
        // 1. Create a thread
        console.log('Creating thread...');
        const thread = await rest.post(Routes.threads(parentChannelId), {
            body: {
                name: '🍝 至高のレシピ：カルボナーラ編',
                auto_archive_duration: 60,
                type: ChannelType.PublicThread
            }
        });

        console.log(`Created thread: ${thread.id}`);

        // 2. Post the rich embed in the thread
        console.log('Posting rich embed to thread...');
        await rest.post(Routes.channelMessages(thread.id), {
            body: {
                content: '新しく作成したこのスレッドの中に、一番豪華なレシピを保管しておきますね！🎁🍝',
                embeds: [embed]
            }
        });

        console.log('Successfully posted rich embed in the thread!');
    } catch (error) {
        console.error('Error:', error);
    }
}

createThreadAndPost();
