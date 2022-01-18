const { Scenes } = require("telegraf");
const { playlistAdd, playlistEdit } = require("./playlist");
const { videoAdd, videos } = require("./video");
const broadcast = require("./broadcast");
const stage = new Scenes.Stage([
    playlistAdd,
    playlistEdit,
    broadcast,
    videoAdd,
    videos,
]);

module.exports = stage;
