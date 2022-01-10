const { Markup } = require("telegraf");
const { playlistBtns } = require("../configs/keyboards");
const {
    playlist: { admin },
} = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/dashboard/playlist");
    context.reply(admin.main, Markup.keyboard(playlistBtns.admin).resize());
};
