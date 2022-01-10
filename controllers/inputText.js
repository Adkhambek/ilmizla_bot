const {
    feedback: { accept, empty, done },
} = require("../configs/texts");
const userModel = require("../models/users");
const feedbackModel = require("../models/feedbacks");
const backwards = require("./backwards");
const mainMenu = require("./mainMenu");

module.exports = async (context) => {
    const chatId = context.chat.id;
    let message = context.message.text;
    const { page } = await userModel.getPage(chatId);
    switch (page) {
        case "menu/feedback":
            switch (message) {
                case "✅ Yuborish":
                    const checkFeed = await feedbackModel.getAcceptedFeedbacks(
                        chatId
                    );
                    if (!checkFeed) return context.reply(empty);
                    await feedbackModel.sendFeedback(chatId);
                    mainMenu(context, done);
                    break;
                case "🚫 Bekor qilish":
                    await feedbackModel.deleteInActiveFeedbacks(chatId);
                    backwards(context);
                    break;
                default:
                    await feedbackModel.insertFeedback({
                        chat_id: chatId,
                        username: context.chat.username,
                        message,
                    });
                    context.reply(accept, { parse_mode: "HTML" });
                    break;
            }
    }
};
