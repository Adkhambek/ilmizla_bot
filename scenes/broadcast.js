const { Markup, Scenes } = require("telegraf");
const backwards = require("../controllers/backwards");
const mainMenu = require("../controllers/mainMenu");
const userModel = require("../models/users");

module.exports = new Scenes.WizardScene(
    "BROADCAST",
    async (ctx) => {
        if (ctx.update.message.text === "✅ Yuborish") {
            ctx.reply(`⚠️ Xaba kiritganiz yo'q.\n
🔄 Iltimos, qaytadan urinib ko'ring`);
            ctx.wizard.state.message = ctx.update.message.text;
            return ctx.scene.leave();
        }
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            backwards(ctx);
            return ctx.scene.leave();
        }
        ctx.reply("Yuborish tugmasini bosing 👇");
        ctx.wizard.state.message = ctx.update.message.text;
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.message.text === "✅ Yuborish") {
            try {
                const users = await userModel.allUserIds();
                for (const user of users) {
                    ctx.telegram.sendMessage(
                        user.chat_id,
                        ctx.wizard.state.message
                    );
                }
                ctx.reply("Xabaringiz muvaffaqiyatli yuborildi");
                backwards(ctx);
                return ctx.scene.leave();
            } catch (err) {
                ctx.reply("Xabaringiz muvaffaqiyatli yuborildi");
                backwards(ctx);
                return ctx.scene.leave();
            }
        }
        if (ctx.update.message.text === "🚫 Bekor qilish") {
            backwards(ctx);
            return ctx.scene.leave();
        }
    }
);
