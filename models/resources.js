const orm = require("../utils/orm");

exports.uploadResource = (data) => orm.insertOne("resources", data);
exports.updateStatusToActive = () =>
    orm.updateOne("resources", { status: 1 }, "status = 0");
exports.deleteInActiveResources = () =>
    orm.deleteOne("resources", "status = 0");
exports.getInActiveResources = () => orm.selectMany("resources", "status = 0");
// exports.getActiveVideos = () =>
//     orm.selectMany("videos", "status = 1 ORDER BY id");
// exports.getVideosWithPlaylist = (playlist) =>
//     orm.selectManyWithJoin(
//         "videos",
//         "JOIN playlists on videos.playlist_id = playlists.id",
//         `playlists.name = '${playlist}' AND videos.status = 1 ORDER BY id`,
//         ["videos.id", "videos.name"]
//     );
exports.getResources = (playlistId) =>
    orm.selectMany("resources", `playlist_id = ${playlistId}`, ["file_id"]);
// exports.deleteVideo = (id) => orm.deleteOne("videos", `id = ${id}`);
// exports.countVideos = (palylistId) =>
//     orm.selectMany("videos", `playlist_id = ${palylistId}`, [
//         "count(*) as total",
//     ]);
// exports.totalVideoDuration = (palylistId) =>
//     orm.selectMany("videos", `playlist_id = ${palylistId}`, ["SUM(duration)"]);
// exports.pagination = (offset, limit) =>
//     orm.selectSome("videos", "id", `OFFSET ${offset} LIMIT ${limit}`, ["name"]);
