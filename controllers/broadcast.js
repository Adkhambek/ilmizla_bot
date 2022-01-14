const { Markup } = require("telegraf");
const { feedbackBtns } = require("../configs/keyboards");
const { broadcast } = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/dashboard/broadcast");
    context.reply(broadcast, Markup.keyboard(feedbackBtns).resize());
};
