const model = require("../models/users");
const mainMenu = require("./mainMenu");
const dashboard = require("./dashboard");
const playlist = require("./playlist");
const video = require("./video");
const videos = require("./videos");
const resource = require("./resource");

module.exports = async (context) => {
    const chatId = context.chat.id;
    const { page } = await model.getPage(chatId);
    let breadcrumb = page.split("/");
    breadcrumb.length = breadcrumb.length - 1;
    breadcrumb = breadcrumb.join("/");
    switch (breadcrumb) {
        case "menu":
            mainMenu(context);
            break;
        case "menu/dashboard":
            dashboard(context);
            break;
        case "menu/dashboard/playlist":
            playlist(context);
            break;
        case "menu/dashboard/video":
            video(context);
            break;
        case "menu/videos":
            videos(context);
            break;
        case "menu/dashboard/resource":
            resource(context);
            break;
    }
};
