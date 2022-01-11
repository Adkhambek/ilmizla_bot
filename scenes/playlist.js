const { Markup, Scenes } = require("telegraf");
const model = require("../models/playlist");
const { playlistBtns } = require("../configs/keyboards");

module.exports = new Scenes.WizardScene(
    "PLATLIST_SCENE",
    async (ctx) => {
        ctx.reply("Kurs muallifining to'liq ismini kiriting:");
        ctx.wizard.state.name = ctx.update.message.text;
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.reply("Youtube playlist linki:");
        ctx.wizard.state.author = ctx.update.message.text;
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.youtube = ctx.update.message.text;
        await model.insertPlaylist(ctx.wizard.state);
        ctx.reply(`<b>${ctx.wizard.state.name}</b> playlisti qo'shildi.`, {
            parse_mode: "HTML",
            ...Markup.keyboard(playlistBtns.admin).resize(),
        });
        console.log(await model.getPlaylists());
        return ctx.scene.leave();
    }
);
