const { Scenes } = require("telegraf");
const { playlistAdd, playlistEdit } = require("./playlist");
const { videoAdd, videos } = require("./video");
const broadcast = require("./broadcast");
const { resourceAdd } = require("./resource");
const stage = new Scenes.Stage([
    playlistAdd,
    playlistEdit,
    broadcast,
    videoAdd,
    videos,
    resourceAdd,
]);

module.exports = stage;
