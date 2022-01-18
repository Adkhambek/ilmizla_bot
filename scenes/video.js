const { Markup, Scenes } = require("telegraf");
const playlistModel = require("../models/playlist");
const videoModel = require("../models/video");
const userModel = require("../models/users");
const { videoBtns, backBtns } = require("../configs/keyboards");
const backwards = require("../controllers/backwards");
const mainMenu = require("../controllers/mainMenu");
const { convertHMS } = require("../utils/timeConverter");
const {
    error,
    video: { public },
} = require("../configs/texts");
const { botUsername } = require("../configs/keys");
const chunk = require("../utils/chunk");

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

exports.videos = new Scenes.WizardScene(
    "VIDEOS",
    async (ctx) => {
        try {
            const chatId = ctx.chat.id;
            await userModel.setPage(chatId, "menu/videos/view");
            const text = ctx.update.message.text;
            if (text === "🔙 Orqaga") {
                backwards(ctx);
                return ctx.scene.leave();
            } else if (text === "🔝 Asosiy Menyu") {
                mainMenu(ctx);
                return ctx.scene.leave();
            }
            const playlist = await playlistModel.getPlaylistColumn(
                ctx.update.message.text
            );
            ctx.wizard.state.playlistId = playlist.id;
            const [{ total }] = await videoModel.countVideos(playlist.id);
            const [{ sum }] = await videoModel.totalVideoDuration(playlist.id);
            await ctx.reply(
                public.playlist(
                    playlist.name,
                    playlist.author,
                    total,
                    convertHMS(sum)
                ),
                {
                    parse_mode: "HTML",
                    disable_web_page_preview: true,
                    ...Markup.keyboard(videoBtns.public).resize(),
                }
            );
            await ctx.reply(
                "Youtubeda Ko'rish",
                Markup.inlineKeyboard([
                    Markup.button.url(playlist.name, playlist.youtube),
                ])
            );
            return ctx.wizard.next();
        } catch (err) {
            ctx.reply(error.notFound, { parse_mode: "HTML" });
            return;
        }
    },
    async (ctx) => {
        const playlistId = ctx.wizard.state.playlistId;
        const videos = await videoModel.getVideos(playlistId);
        switch (ctx.update.message.text) {
            case "Hammasini ko'rish":
                if (!videos.length) {
                    ctx.reply("Hozircha ushbu bo'limda videolar yo'q.");
                    return;
                }
                for (video of videos) {
                    await ctx.replyWithVideo(video.file_id, {
                        parse_mode: "HTML",
                        caption: `<b>${video.name}</b>\n\n${botUsername}`,
                    });
                }
                return;
            case "Bo'lib ko'rish":
                if (!videos.length) {
                    ctx.reply("Hozircha ushbu bo'limda videolar yo'q.");
                    return;
                }
                const arr = [];
                for (let i = 1; i <= videos.length; i++) {
                    arr.push(`${i}-dars`);
                }
                ctx.reply(
                    "Qaysi darsni ko'rmoqchisiz?",
                    Markup.keyboard(chunk(arr, 5).concat(backBtns)).resize()
                );
                return ctx.wizard.next();
            case "🔙 Orqaga":
                backwards(ctx);
                return ctx.scene.leave();
            case "🔝 Asosiy Menyu":
                mainMenu(ctx);
                return ctx.scene.leave();
            default:
                ctx.reply(error.notFound, { parse_mode: "HTML" });
                return;
        }
    },
    async (ctx) => {
        try {
            const playlistId = ctx.wizard.state.playlistId;
            const videos = await videoModel.getVideos(playlistId);
            const text = ctx.update.message.text;
            if (text.endsWith("dars")) {
                const num = text.split("-")[0] - 1;
                ctx.replyWithVideo(videos[num].file_id, {
                    parse_mode: "HTML",
                    caption: `<b>${videos[num].name}</b>\n\n${botUsername}`,
                });
                return;
            }
            if (text === "🔙 Orqaga") {
                backwards(ctx);
                return ctx.scene.leave();
            } else if (text === "🔝 Asosiy Menyu") {
                mainMenu(ctx);
                return ctx.scene.leave();
            } else {
                ctx.reply(error.notFound, { parse_mode: "HTML" });
                return;
            }
        } catch (err) {
            ctx.reply(error.notFound, { parse_mode: "HTML" });
            return;
        }
    }
);
