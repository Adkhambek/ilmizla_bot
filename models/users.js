const orm = require("../utils/orm");

exports.insertUser = () => orm.insertOne("users", data);
