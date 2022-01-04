const { Markup } = require("telegraf");
const { menuBtns, adminMenu } = require("../configs/keyboards");
const { start } = require("../configs/texts");
const model = require("../models/users");
const { admins } = require("../configs/keys");

module.exports = async (context) => {
    const { id, first_name, last_name, username } = context.chat;
    const checkAdmin = admins.find((el) => el === id);
    const user = await model.user(id);
    if (!user) {
        await model.insertUser({
            chat_id: id,
            first_name,
            last_name,
            username,
            page: "start",
            role: checkAdmin ? "admin" : "user",
        });
    } else await model.defaultPage(id);

    const keyboard = !checkAdmin ? menuBtns : adminMenu;
    context.replyWithPhoto(
        { source: "./images/logo.jpg" },
        {
            caption: start,
            parse_mode: "HTML",
            ...Markup.keyboard(keyboard).oneTime().resize(),
        }
    );
};
