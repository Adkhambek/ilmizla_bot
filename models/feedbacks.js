const orm = require("../utils/orm");

exports.insertFeedback = (data) => orm.insertOne("feedbacks", data);
exports.sendFeedback = (chat_id) =>
    orm.updateOne(
        "feedbacks",
        { status: 1 },
        `chat_id = ${chat_id} AND status = 0`
    );
exports.deleteFeedback = (chat_id) =>
    orm.deleteOne("feedbacks", `chat_id = ${chat_id} AND status = 0`);
exports.getFeedbacks = () =>
    orm.selectMany("feedbacks", `status = 1`, [
        "id",
        "chat_id",
        "username",
        "message",
        `to_char("date", 'DD/MM/YYYY HH24:MI') as date`,
    ]);
exports.getAcceptedFeedbacks = (chat_id) =>
    orm.selectOne("feedbacks", `chat_id = ${chat_id} AND status = 0`);
