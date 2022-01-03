const orm = require("../utils/orm");

exports.insertUser = (data) => orm.insertOne("users", data);
exports.allUsers = () => orm.selectAll("users");
exports.user = (chat_id) => orm.selectOne("users", `chat_id = ${chat_id}`);
exports.setPage = (chat_id, page) =>
    orm.updateOne("users", { page }, `chat_id = ${chat_id}`);
exports.getPage = (chat_id) =>
    orm.selectOne("users", `chat_id = ${chat_id}`, ["page"]);
