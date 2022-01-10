const { Scenes } = require("telegraf");
const model = require("../models/playlist");

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
        ctx.reply("End");
        console.log(await model.getPlaylists());
        return ctx.scene.leave();
    }
);
