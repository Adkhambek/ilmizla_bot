const { Markup } = require("telegraf");
const {
    playlist: { admin },
} = require("../configs/texts");
const { backBtns } = require("../configs/keyboards");
const userModel = require("../models/users");
const playlistModel = require("../models/playlist");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await userModel.setPage(chatId, "menu/dashboard/playlist/edit");
    const [{ total }] = await playlistModel.playlistNum();
    const btns = [];
    for (let i = 0; i < Number(total); i += 2) {
        const playlists = await playlistModel.pagination(i, 2);
        const pagination = playlists.map((e) => e.name);
        btns.push(pagination);
    }
    context.reply(admin.edit, Markup.keyboard(btns.concat(backBtns)).resize());
};
