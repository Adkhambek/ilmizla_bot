const { Markup } = require("telegraf");
const { backBtns } = require("../configs/keyboards");
const { communityTxt } = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/community");
    context.reply(communityTxt, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        ...Markup.keyboard(backBtns).resize(),
    });
};
