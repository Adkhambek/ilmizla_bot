const { Markup } = require("telegraf");
const { playlistBtn } = require("../configs/keyboards");
const { playlist } = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/dashboard/playlist");
    context.reply(playlist.admin, Markup.keyboard(playlistBtn).resize());
};
