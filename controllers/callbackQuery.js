const feedbackModel = require("../models/feedbacks");

module.exports = async (context) => {
    context.deleteMessage();
    const { data } = context.update.callback_query;
    const arr = data.split("-");
    switch (arr[0]) {
        case "delete":
            await feedbackModel.deleteFeedback(arr[1]);
            context.answerCbQuery();
            break;

        default:
            break;
    }
};
