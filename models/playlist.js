const orm = require("../utils/orm");

exports.insertPlaylist = (data) => orm.insertOne("playlists", data);
exports.getPlaylists = () =>
    orm.selectAll("playlists", ["id", "name", "youtube"]);
exports.getPlaylistColumn = (playlistName) =>
    orm.selectOne("playlists", `name = '${playlistName}'`);
exports.deletePlaylist = (id) => orm.deleteOne("playlists", `id = ${id}`);
exports.pagination = (offset, limit) =>
    orm.selectSome("playlists", "id", `OFFSET ${offset} LIMIT ${limit}`, [
        "name",
    ]);
exports.playlistNum = () => orm.selectAll("playlists", ["count(*) as total"]);
exports.updatePlaylist = (data, playlistName) =>
    orm.updateOne("playlists", data, `name = '${playlistName}'`);
