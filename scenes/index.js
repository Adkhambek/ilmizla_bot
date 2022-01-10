const { Scenes } = require("telegraf");
const PLATLIST_SCENE = require("./playlist");

const stage = new Scenes.Stage([PLATLIST_SCENE]);

module.exports = stage;
