const orm = require("../utils/orm");

exports.insertPlaylist = (data) => orm.insertOne("playlists", data);
exports.getPlaylists = () => orm.selectAll("playlists");
