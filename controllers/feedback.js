const { Markup } = require("telegraf");
const { feedbackBtns } = require("../configs/keyboards");
const {
    feedback: { main },
} = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/feedback");
    context.reply(main, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        ...Markup.keyboard(feedbackBtns).resize(),
    });
};
