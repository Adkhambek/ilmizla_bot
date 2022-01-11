const { Telegraf, session } = require("telegraf");
const { TOKEN } = require("./configs/keys");
const bot = new Telegraf(TOKEN);
const controller = require("./controllers");
const isAdmin = require("./middlewares/isAdmin");
const stage = require("./scenes");

// Middleware
bot.use(session());
bot.use(stage.middleware());
bot.use(isAdmin);

// Public
bot.start((ctx) => controller.startMenu(ctx));
bot.hears("👥 Bizga qo'shiling", (ctx) => controller.community(ctx));
bot.hears("📩 Taklif yuborish", (ctx) => controller.feedback(ctx));
bot.hears("🔝 Asosiy Menyu", (ctx) => controller.mainMenu(ctx));
bot.hears("🔙 Orqaga", (ctx) => controller.backwards(ctx));

// Dashboard for Admins:
bot.hears("🔒 Admin", (ctx) => controller.dashboard(ctx));
bot.hears("📩 Takliflar", (ctx) => controller.feedbacks(ctx));
bot.hears("🗂 Playlist", (ctx) => controller.playlist(ctx));
bot.hears("➕ Playlist qo'shish", (ctx) => controller.playlistAdd(ctx));
bot.hears("✖️ Playlist o'chirish", (ctx) => controller.playlistRemove(ctx));
bot.hears("📝 Playlist o'zgartirish", (ctx) => controller.playlistEdit(ctx));

bot.on("callback_query", (ctx) => controller.callbackQuery(ctx));
bot.on("text", (ctx) => controller.inputText(ctx));

module.exports = bot;
