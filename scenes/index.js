const { Scenes } = require("telegraf");
const { playlistAdd, playlistEdit } = require("./playlist");
const broadcast = require("./broadcast");
const stage = new Scenes.Stage([playlistAdd, playlistEdit, broadcast]);

module.exports = stage;
