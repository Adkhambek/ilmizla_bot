const { Markup } = require("telegraf");
const { backBtns } = require("../configs/keyboards");
const {
    feedback: { detail },
} = require("../configs/texts");
const userModel = require("../models/users");
const feedbackModel = require("../models/feedbacks");

module.exports = async (context) => {
    const chatId = context.chat.id;
    await userModel.setPage(chatId, "menu/dashboard/feedbacks");
    const feedbacks = await feedbackModel.getFeedbacks();
    if (feedbacks.length === 0) {
        return context.reply("There are not any feedbacks", {
            ...Markup.keyboard(backBtns).resize(),
        });
    }
    context.reply("feedbacks:", {
        ...Markup.keyboard(backBtns).resize(),
    });
    for (const feedback of feedbacks) {
        let text = detail(feedback.date, feedback.message, feedback.username);
        context.reply(text, {
            parse_mode: "HTML",
            disable_web_page_preview: true,
            ...Markup.inlineKeyboard([
                Markup.button.callback("❌ Delete", `delete-${feedback.id}`),
            ]),
        });
    }
};

// Markup.button.callback("📬 Send Message", "send")
