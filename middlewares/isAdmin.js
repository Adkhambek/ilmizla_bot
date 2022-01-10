const model = require("../models/users");

module.exports = async (context, next) => {
    const chatId = context.chat.id;
    try {
        const btn = context.message.text;
        const adminBtns = [
            "📊 Statistika",
            "📩 Takliflar",
            "📢 Xabar yuborish",
            "🗂 Playlist",
        ];

        if (adminBtns.includes(btn)) {
            const adminRole = await model.isAdmin(chatId);
            if (adminRole) await next();
            else context.reply("Sizda adminlik huquqi yo'q");
        } else {
            await next();
        }
    } catch (error) {
        await next();
    }
};
