const { Markup } = require("telegraf");
const { videoBtns } = require("../configs/keyboards");
const {
    video: { admin },
} = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/dashboard/video");
    context.reply(admin.main, Markup.keyboard(videoBtns.admin).resize());
};
