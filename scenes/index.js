const { Scenes } = require("telegraf");
const { playlistAdd, playlistEdit } = require("./playlist");
const { videoAdd } = require("./video");
const broadcast = require("./broadcast");
const stage = new Scenes.Stage([
    playlistAdd,
    playlistEdit,
    broadcast,
    videoAdd,
]);

module.exports = stage;
