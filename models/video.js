const { selectMany } = require("../utils/orm");
const orm = require("../utils/orm");

exports.uploadVideo = (data) => orm.insertOne("videos", data);
exports.updateStatusToActive = () =>
    orm.updateOne("videos", { status: 1 }, "status = 0");
exports.deleteInActiveVideos = () => orm.deleteOne("videos", "status = 0");
exports.getInActiveVideos = () => orm.selectMany("videos", "status = 0");
exports.getActiveVideos = () =>
    orm.selectMany("videos", "status = 1 ORDER BY id");
exports.getVideosWithPlaylist = (playlist) =>
    orm.selectManyWithJoin(
        "videos",
        "JOIN playlists on videos.playlist_id = playlists.id",
        `playlists.name = '${playlist}' AND videos.status = 1 ORDER BY id`,
        ["videos.id", "videos.name"]
    );
exports.getVideos = (playlistId) =>
    selectMany("videos", `playlist_id = ${playlistId}`, ["name", "file_id"]);
exports.deleteVideo = (id) => orm.deleteOne("videos", `id = ${id}`);
exports.countVideos = (palylistId) =>
    orm.selectMany("videos", `playlist_id = ${palylistId}`, [
        "count(*) as total",
    ]);
exports.totalVideoDuration = (palylistId) =>
    orm.selectMany("videos", `playlist_id = ${palylistId}`, ["SUM(duration)"]);
exports.pagination = (offset, limit) =>
    orm.selectSome("videos", "id", `OFFSET ${offset} LIMIT ${limit}`, ["name"]);
