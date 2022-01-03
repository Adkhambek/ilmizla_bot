const bot = require("./index");
const express = require("express");
const { production } = require("./configs/keys");

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
