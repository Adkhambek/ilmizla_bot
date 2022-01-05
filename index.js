const { Telegraf, session } = require("telegraf");
const { TOKEN } = require("./configs/keys");
const bot = new Telegraf(TOKEN);
const controller = require("./controllers");
const isAdmin = require("./middlewares/isAdmin");

bot.use(session());
bot.start((ctx) => controller.startMenu(ctx));
bot.hears("👥 Bizga qo'shiling", (ctx) => controller.community(ctx));
bot.hears("📩 Taklif", (ctx) => controller.feedback(ctx));
bot.hears("🔝 Asosiy Menyu", (ctx) => controller.mainMenu(ctx));
bot.hears("🔙 Orqaga", (ctx) => controller.backwards(ctx));

bot.on("text", (ctx) => controller.inputText(ctx));

// Dashboard for Admins:
bot.use(isAdmin);
bot.hears("🔒 Admin", (ctx) => controller.dashboard(ctx));

module.exports = bot;
