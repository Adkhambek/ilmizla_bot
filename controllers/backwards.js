const model = require("../models/users");
const mainMenu = require("./mainMenu");

module.exports = async (context) => {
    const chatId = context.chat.id;
    const { page } = await model.getPage(chatId);
    let breadcrumb = page.split("/");
    breadcrumb.length = breadcrumb.length - 1;
    breadcrumb = breadcrumb.join("/");
    switch (breadcrumb) {
        case "menu":
            return mainMenu(context);
            break;
    }
};
