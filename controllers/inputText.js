const {
    error,
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
                    const [{ count }] = await feedbackModel.countFeedbacks(
                        chatId
                    );
                    if (+count !== 3) {
                        await feedbackModel.insertFeedback({
                            chat_id: chatId,
                            username: context.chat.username,
                            message,
                        });
                        return context.reply(accept, { parse_mode: "HTML" });
                    } else {
                        return context.reply(error.limitMessage, {
                            parse_mode: "HTML",
                        });
                    }
            }
            break;
        case "menu/dashboard/playlist/add":
            context.scene.enter("PLATLIST_SCENE");
            break;
        case "menu/dashboard/playlist/edit":
            context.scene.enter("PLAYLIST_EDIT_SCENE");
            break;
        case "menu/dashboard/broadcast":
            context.scene.enter("BROADCAST");
            break;
        case "menu/dashboard/video/add":
            context.scene.enter("VIDEO_ADD");
            break;
        case "menu/videos":
            context.scene.enter("VIDEOS");
            break;
        case "menu/dashboard/resource":
            context.scene.enter("RESOURCE_ADD");
            break;
        case "menu/resources":
            context.scene.enter("RESOURCES");
            break;
    }
};
