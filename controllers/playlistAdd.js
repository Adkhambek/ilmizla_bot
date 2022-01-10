const { Markup } = require("telegraf");
const { backBtns } = require("../configs/keyboards");
const {
    playlist: { admin },
} = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/dashboard/playlist/add");
    context.reply(admin.add, Markup.keyboard(backBtns).resize());
};
