const feedbackModel = require("../models/feedbacks");
const playlistModel = require("../models/playlist");
const videoModel = require("../models/video");
const { Markup } = require("telegraf");
const {
    playlist: { admin },
} = require("../configs/texts");

module.exports = async (context) => {
    const { data } = context.update.callback_query;
    const arr = data.split("-");
    switch (arr[0]) {
        case "delete":
            context.deleteMessage();
            await feedbackModel.deleteFeedback(arr[1]);
            context.answerCbQuery();
            break;
        case "playlist":
            context.deleteMessage();
            await playlistModel.deletePlaylist(arr[1]);
            const playlists = await playlistModel.getPlaylists();
            const btns = [];
            for (const playlist of playlists) {
                btns.push([
                    Markup.button.callback(playlist.name, "playlist"),
                    Markup.button.callback("❌", `playlist-${playlist.id}`),
                ]);
            }
            context.replyWithMarkdown(
                admin.remove,
                Markup.inlineKeyboard(btns)
            );
            context.answerCbQuery();
            break;
        // case "video": {
        //     context.deleteMessage();
        //     await videoModel.deleteVideo(arr[1]);
        //     const videos = await videoModel.getVideosWithPlaylist(
        //         ctx.update.message.text
        //     );
        //     const btns = [];
        //     for (const video of videos) {
        //         btns.push([
        //             Markup.button.callback(video.name.split(".")[0], "video"),
        //             Markup.button.callback("❌", `video-${video.id}`),
        //         ]);
        //     }
        //     context.replyWithMarkdown(
        //         "Qolgan videolar:",
        //         Markup.inlineKeyboard(btns)
        //     );
        //     context.answerCbQuery();
        //     break;
        // }
        default:
            break;
    }
};
