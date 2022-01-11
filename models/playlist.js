const orm = require("../utils/orm");

exports.insertPlaylist = (data) => orm.insertOne("playlists", data);
exports.getPlaylists = () =>
    orm.selectAll("playlists", ["id", "name", "youtube"]);
exports.deletePlaylist = (id) => orm.deleteOne("playlists", `id = ${id}`);
