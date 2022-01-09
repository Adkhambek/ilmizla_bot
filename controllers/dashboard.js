const { Markup } = require("telegraf");
const { dashboardBtns } = require("../configs/keyboards");
const { dashboardTxt } = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/dashboard");
    context.reply(dashboardTxt, Markup.keyboard(dashboardBtns).resize());
};
