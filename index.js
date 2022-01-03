const { Telegraf, Markup } = require("telegraf");
const express = require("express");
const { TOKEN, production } = require("./configs/keys");
const { menuBtns } = require("./configs/keyboards");
const { menu } = require("./configs/texts");
const bot = new Telegraf(TOKEN);
const orm = require("./utils/orm");

bot.start(async (ctx) => {
    ctx.replyWithPhoto(
        { source: "./images/logo.jpg" },
        {
            caption: menu.photoCaption,
            parse_mode: "HTML",
            ...Markup.keyboard(menuBtns).oneTime().resize(),
        }
    );
});

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
