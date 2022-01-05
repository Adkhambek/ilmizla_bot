const model = require("../models/users");

module.exports = async (context, next) => {
    const chatId = context.chat.id;
    const adminRole = await model.isAdmin(chatId);
    if (adminRole) await next();
    else context.reply("Sizda adminlik huquqi yo'q");
};
