const { Markup, Scenes } = require("telegraf");
const model = require("../models/playlist");
const { playlistBtns } = require("../configs/keyboards");
const backwards = require("../controllers/backwards");
const mainMenu = require("../controllers/mainMenu");

exports.playlistAdd = new Scenes.WizardScene(
    "PLATLIST_SCENE",
    async (ctx) => {
        ctx.reply(
            "Kurs muallifining to'liq ismini kiriting:",
            Markup.keyboard([["🚫 Bekor qilish"]]).resize()
        );
        ctx.wizard.state.name = ctx.update.message.text;
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            backwards(ctx);
            return ctx.scene.leave();
        }
        ctx.reply("Youtube playlist linki:");
        ctx.wizard.state.author = ctx.update.message.text;
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            backwards(ctx);
            return ctx.scene.leave();
        }
        ctx.wizard.state.youtube = ctx.update.message.text;
        await model.insertPlaylist(ctx.wizard.state);
        ctx.reply(`<b>${ctx.wizard.state.name}</b> playlisti qo'shildi.`, {
            parse_mode: "HTML",
            ...Markup.keyboard(playlistBtns.admin).resize(),
        });
        return ctx.scene.leave();
    }
);

exports.playlistEdit = new Scenes.WizardScene(
    "PLAYLIST_EDIT_SCENE",
    async (ctx) => {
        ctx.reply("Playlistning aynan qaysi qismini o'zgartirmoqchisiz:", {
            parse_mode: "HTML",
            ...Markup.keyboard([
                ["name", "author", "youtube"],
                ["🚫 Bekor qilish"],
            ]).resize(),
        });
        ctx.wizard.state.playlist = ctx.update.message.text;
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            backwards(ctx);
            return ctx.scene.leave();
        }
        ctx.wizard.state.column = ctx.update.message.text;
        const oldValue = await model.getPlaylistColumn(
            ctx.wizard.state.playlist,
            ctx.wizard.state.column
        );
        ctx.reply(
            `<b>Eski qiymati:</b> ${Object.values(oldValue)}\n
<b>Yangi qiymatni kiriting:</b>`,
            {
                parse_mode: "HTML",
                ...Markup.keyboard([["🚫 Bekor qilish"]]).resize(),
            }
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            backwards(ctx);
            return ctx.scene.leave();
        }
        ctx.wizard.state.value = ctx.update.message.text;
        ctx.reply(`<b>${ctx.wizard.state.playlist}</b> playlisti o'zgardi.`, {
            parse_mode: "HTML",
            ...Markup.keyboard(playlistBtns.admin).resize(),
        });
        const data = {};
        data[ctx.wizard.state.column] = ctx.wizard.state.value;
        await model.updatePlaylist(data, ctx.wizard.state.playlist);
        return ctx.scene.leave();
    }
);
