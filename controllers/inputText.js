const { feedbackTxt } = require("../configs/texts");
const userModel = require("../models/users");
const feedbackModel = require("../models/feedbacks");

module.exports = async (context) => {
    const chatId = context.chat.id;
    let session = context.session;
    let message = context.message.text;
    const { page } = await userModel.getPage(chatId);
    switch (page) {
        case "menu/feedback":
            session = { message };
            switch (session.message) {
                case "📩 Taklif":
                case "🚫 Bekor qilish":
                    delete session.message;
                    break;
                case "✅ Yuborish":
                    console.log(await feedbackModel.getFeedback(chatId));
                    break;
                default:
                    await feedbackModel.insertFeedback({
                        chat_id: chatId,
                        username: context.chat.username,
                        message,
                    });
                    delete session.message;
                    context.reply("Yuborildi");
                    break;
            }
    }
};
