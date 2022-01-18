const { Markup } = require("telegraf");
const { resourceBtns } = require("../configs/keyboards");
const {
    resource: { admin },
} = require("../configs/texts");
const model = require("../models/users");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await model.setPage(chatId, "menu/dashboard/resource");
    context.reply(admin.main, Markup.keyboard(resourceBtns.admin).resize());
};
