const { Telegraf } = require("telegraf");
const express = require("express");
const { TOKEN, production } = require("./config");
const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply("Hello World"));

if (process.env.NODE_ENV === "production") {
    const { PORT, baseUrl, secretPath } = production;
    bot.telegram.setWebhook(baseUrl + secretPath);
    const app = express();
    app.get("/", (req, res) => res.send("Test"));
    app.use(bot.webhookCallback(secretPath));
    app.listen(PORT, () => {
        console.log("Bot running in production mode ...");
    });
} else {
    bot.launch()
        .then(() => console.log("Bot running in development mode..."))
        .catch((err) => console.log(err));
}
