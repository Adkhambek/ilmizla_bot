const { Scenes } = require("telegraf");
const { playlistAdd, playlistEdit } = require("./playlist");
const stage = new Scenes.Stage([playlistAdd, playlistEdit]);

module.exports = stage;
