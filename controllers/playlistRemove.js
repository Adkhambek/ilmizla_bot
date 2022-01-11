const { Markup } = require("telegraf");
const {
    playlist: { admin },
} = require("../configs/texts");
const playlistModel = require("../models/playlist");

module.exports = async (context) => {
    const playlists = await playlistModel.getPlaylists();
    const arr = [];
    for (const playlist of playlists) {
        arr.push([
            Markup.button.callback(playlist.name, "playlist"),
            Markup.button.callback("❌", `playlist-${playlist.id}`),
        ]);
    }
    context.reply(admin.remove, Markup.inlineKeyboard(arr));
};
