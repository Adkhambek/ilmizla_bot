require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN,
    dbUrl: process.env.DB_URL,
    production: {
        PORT: process.env.PORT,
        baseUrl: process.env.BASE_URL,
        secretPath: process.env.SECRET_PATH,
    },
    admins: [Number(process.env.ADMIN_1)],
};
