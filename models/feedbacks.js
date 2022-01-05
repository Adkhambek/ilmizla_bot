const orm = require("../utils/orm");

exports.insertFeedback = (data) => orm.insertOne("feedbacks", data);
exports.getFeedback = (chat_id) =>
    orm.selectOne(
        "feedbacks",
        `chat_id = ${chat_id} AND date = (SELECT MAX(date) FROM feedbacks)`
    );
