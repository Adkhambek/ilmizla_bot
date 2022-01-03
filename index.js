const { Telegraf, Markup } = require("telegraf");
const { TOKEN } = require("./configs/keys");
const bot = new Telegraf(TOKEN);
const { startMenu } = require("./controllers");

bot.start((ctx) => startMenu(ctx));

module.exports = bot;
