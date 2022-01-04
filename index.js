const { Telegraf, Markup } = require("telegraf");
const { TOKEN } = require("./configs/keys");
const bot = new Telegraf(TOKEN);
const { startMenu, community, mainMenu } = require("./controllers");

bot.start((ctx) => startMenu(ctx));
bot.hears("👥 Bizga qo'shiling", (ctx) => community(ctx));
bot.hears("🔝 Asosiy Menyu", (ctx) => mainMenu(ctx));

module.exports = bot;
