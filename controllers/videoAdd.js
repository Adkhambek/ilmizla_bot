const { Markup } = require("telegraf");
const { backBtns } = require("../configs/keyboards");
const {
    video: { admin },
} = require("../configs/texts");
const userModel = require("../models/users");
const playlistModel = require("../models/playlist");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await userModel.setPage(chatId, "menu/dashboard/video/add");
    const [{ total }] = await playlistModel.playlistNum();
    const btns = [];
    for (let i = 0; i < Number(total); i += 2) {
        const playlists = await playlistModel.pagination(i, 2);
        const pagination = playlists.map((e) => e.name);
        btns.push(pagination);
    }
    context.reply(admin.add, Markup.keyboard(btns.concat(backBtns)).resize());
};
