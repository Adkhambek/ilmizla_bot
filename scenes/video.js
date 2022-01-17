const { Markup, Scenes } = require("telegraf");
const playlistModel = require("../models/playlist");
const videoModel = require("../models/video");
const { videoBtns } = require("../configs/keyboards");
const backwards = require("../controllers/backwards");

exports.videoAdd = new Scenes.WizardScene(
    "VIDEO_ADD",
    async (ctx) => {
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            await videoModel.deleteInActiveVideos();
            backwards(ctx);
            return ctx.scene.leave();
        }
        const playlist = await playlistModel.getPlaylistColumn(
            ctx.update.message.text,
            "id"
        );

        ctx.wizard.state.playlistId = playlist.id;
        ctx.reply(
            "Videoni kiriting:",
            Markup.keyboard([["🚫 Bekor qilish"], ["✅ Qo'shish"]]).resize()
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            await videoModel.deleteInActiveVideos();
            backwards(ctx);
            return ctx.scene.leave();
        }
        if (ctx.update.message.text === "✅ Qo'shish") {
            const inactiveVideo = await videoModel.getInActiveVideos();
            if (!inactiveVideo.length) return ctx.reply("Video kiritmadingiz");
            await videoModel.updateStatusToActive();
            ctx.reply(
                "Video qo'shildi",
                Markup.keyboard(videoBtns.admin).resize()
            );
            return ctx.scene.leave();
        }
        const { duration, file_name, file_id } = ctx.update.message.video;
        await videoModel.uploadVideo({
            name: file_name,
            file_id,
            playlist_id: ctx.wizard.state.playlistId,
            duration,
        });
        ctx.reply("Yana video kiritasizmi ?");
    }
);

exports.videoDelete = new Scenes.WizardScene("VIDEO_DELETE", async (ctx) => {
    console.log(ctx.update.message.text);
    const videos = await videoModel.getVideosWithPlaylist(
        ctx.update.message.text
    );
    const arr = [];
    for (const video of videos) {
        arr.push([
            Markup.button.callback(video.name.split(".")[0], "video"),
            Markup.button.callback("❌", `video-${video.id}`),
        ]);
    }
    ctx.reply(`<b>${ctx.update.message.text}</b> bo'limidagi videolar:`, {
        parse_mode: "HTML",
        ...Markup.inlineKeyboard(arr),
    });
});
