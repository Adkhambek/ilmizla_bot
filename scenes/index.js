const { Scenes } = require("telegraf");
const { playlistAdd, playlistEdit } = require("./playlist");
const { videoAdd, videos } = require("./video");
const broadcast = require("./broadcast");
const { resourceAdd, resources } = require("./resource");
const stage = new Scenes.Stage([
    playlistAdd,
    playlistEdit,
    broadcast,
    videoAdd,
    videos,
    resourceAdd,
    resources,
]);

module.exports = stage;
