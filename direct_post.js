import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { config } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env') });

const token = process.env.DISCORD_BOT_TOKEN;
const channelId = '1474774608531161109';

if (!token) {
    console.error('Missing DISCORD_BOT_TOKEN');
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

const embed = {
    title: '🍝 至高のカルボナーラ：レシピ決定版 🍝',
    description: `**至高のレシピ：特製カルボナーラ (Rich Embeds)** 🍝✨

**材料 (1人分):**
- パスタ (1.6mm): 100g
- パンチェッタ（またはベーコン）: 40g
- 全卵: 1個
- 卵黄: 1個
- ペルメザンチーズ: 30g
- 黒胡椒: 適量（多めがおすすめ）
- 塩（ゆで用）: 適量

**作り方:**
1. **下準備:** 卵とチーズをよく混ぜ合わせ、ソースを作っておきます。ベーコンは細切りにします。
2. **炒める:** パンチェッタを弱火でじっくり炒め、脂をしっかり出します。
3. **茹でる:** パスタを袋の表示より1分短く茹でます。
4. **仕上げ:** 茹で上がったパスタをパンチェッタと合わせ、少し冷ましてから卵液を投入し、余熱でとろみをつけます。

**コツ:**
- 余熱で仕上げることで、卵が固まらずクリーミーになります！🌟
- サムネイルには完成イメージを配置しました。🎨`,
    color: 16753920, // Orange/Gold
    thumbnail: {
        url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop'
    },
    fields: [
        { name: '⏱️ 調理時間', value: '15分', inline: true },
        { name: '🍳 難易度', value: '★★★☆☆', inline: true }
    ],
    footer: {
        text: '至高のひとときを、食卓に。🍝🍷'
    }
};

async function post() {
    try {
        await rest.post(Routes.channelMessages(channelId), {
            body: {
                content: '通常チャンネルに「至高のカラー枠」付きのレシピを改めて投稿いたします！🍝✨\nBDScriptの仕様（$color, $thumbnail）を忠実に再現した、本物のリッチ表示をお楽しみください。🌟🎨',
                embeds: [embed]
            }
        });
        console.log('Successfully posted rich embed!');
    } catch (error) {
        console.error('Error posting message:', error);
    }
}

post();
