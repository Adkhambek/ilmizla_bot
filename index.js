const { Telegraf } = require("telegraf");
const express = require("express");
const { TOKEN, production } = require("./config");
const bot = new Telegraf(TOKEN);
const orm = require("./utils/orm");

bot.start((ctx) => ctx.reply("Hello World"));

(async function () {
    // const newUser = await orm.insertOne(
    //     "admins",
    //     {
    //         chat_id: 560729439,
    //     },
    //     "chat_id"
    // );
    // console.log(newUser);
    await orm.updateOne(
        "admins",
        {
            chat_id: 560729440,
        },
        "chat_id = 560729439"
    );
    console.log(await orm.selectAll("admins"));
})();

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
