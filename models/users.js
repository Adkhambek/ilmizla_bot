const orm = require("../utils/orm");

exports.insertUser = (data) => orm.insertOne("users", data);
exports.allUsers = () => orm.selectAll("users");
exports.allUserIds = () => orm.selectAll("users", ["chat_id"]);
exports.user = (chat_id) => orm.selectOne("users", `chat_id = ${chat_id}`);
exports.setPage = (chat_id, page) =>
    orm.updateOne("users", { page }, `chat_id = ${chat_id}`);
exports.isAdmin = (chat_id) =>
    orm.selectOne("users", `chat_id = ${chat_id} AND role = 'admin'`);
exports.getPage = (chat_id) =>
    orm.selectOne("users", `chat_id = ${chat_id}`, ["page"]);
exports.defaultPage = (chat_id) =>
    orm.updateOne("users", { page: "menu" }, `chat_id = ${chat_id}`);
