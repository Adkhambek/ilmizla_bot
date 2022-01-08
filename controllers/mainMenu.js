const { Markup } = require("telegraf");
const { menuBtns, adminMenu } = require("../configs/keyboards");
const { menu } = require("../configs/texts");
const model = require("../models/users");
const { admins } = require("../configs/keys");

module.exports = async (context, text = menu) => {
    const chatId = context.chat.id;
    await model.defaultPage(chatId);
    const checkAdmin = admins.find((el) => el === chatId);
    const keyboard = !checkAdmin ? menuBtns : adminMenu;
    context.reply(text, Markup.keyboard(keyboard).resize());
};
