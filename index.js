const { Telegraf, Markup } = require("telegraf");
const { TOKEN } = require("./configs/keys");
const bot = new Telegraf(TOKEN);
const controller = require("./controllers");
const isAdmin = require("./middlewares/isAdmin");

bot.start((ctx) => startMenu(ctx));
bot.hears("👥 Bizga qo'shiling", (ctx) => controller.community(ctx));
bot.hears("🔝 Asosiy Menyu", (ctx) => controller.mainMenu(ctx));
bot.hears("🔙 Orqaga", (ctx) => controller.backwards(ctx));

// Dashboard for Admins:
bot.use(isAdmin);
bot.hears("🔒 Admin", (ctx) => controller.dashboard(ctx));

module.exports = bot;
