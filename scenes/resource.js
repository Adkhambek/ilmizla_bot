const { Markup, Scenes } = require("telegraf");
const {
    resource: { admin },
} = require("../configs/texts");
const { backBtns, resourceBtns } = require("../configs/keyboards");
const userModel = require("../models/users");
const playlistModel = require("../models/playlist");
const resourceModel = require("../models/resources");
const backwards = require("../controllers/backwards");

exports.resourceAdd = new Scenes.WizardScene(
    "RESOURCE_ADD",
    async (ctx) => {
        const chatId = ctx.chat.id;
        await userModel.setPage(chatId, "menu/dashboard/resource/add");
        const [{ total }] = await playlistModel.playlistNum();
        const btns = [];
        for (let i = 0; i < Number(total); i += 2) {
            const playlists = await playlistModel.pagination(i, 2);
            const pagination = playlists.map((e) => e.name);
            btns.push(pagination);
        }
        ctx.reply(admin.add, Markup.keyboard(btns.concat(backBtns)).resize());
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            await resourceModel.deleteInActiveresources();
            backwards(ctx);
            return ctx.scene.leave();
        }
        const playlist = await playlistModel.getPlaylistColumn(
            ctx.update.message.text
        );
        ctx.wizard.state.playlistId = playlist.id;
        await ctx.reply(
            "Faylni kiriting:",
            Markup.keyboard([["🚫 Bekor qilish"], ["✅ Qo'shish"]]).resize()
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        const text = ctx.update.message.text;
        if (text === "🚫 Bekor qilish") {
            await resourceModel.deleteInActiveResources();
            backwards(ctx);
            return ctx.scene.leave();
        }
        if (text === "✅ Qo'shish") {
            const inactiveVideo = await resourceModel.getInActiveResources();
            if (!inactiveVideo.length) return ctx.reply("fayl kiritmadingiz");
            await resourceModel.updateStatusToActive();
            ctx.reply("Fayllar qo'shildi");
            backwards(ctx);
            return ctx.scene.leave();
        }
        await resourceModel.uploadResource({
            playlist_id: ctx.wizard.state.playlistId,
            file_id: ctx.update.message.document.file_id,
        });
        ctx.reply("Yana fayl kiritasizmi ?");
        return;
    }
);
