const { Markup } = require("telegraf");
const { backBtns } = require("../configs/keyboards");
const { statisticsTxt } = require("../configs/texts");
const userModel = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await userModel.setPage(chatId, "menu/dashboard/statistics");
    const [{ total }] = await userModel.countUsers();
    context.reply(statisticsTxt(total), {
        parse_mode: "HTML",
        ...Markup.keyboard(backBtns).resize(),
    });
};
